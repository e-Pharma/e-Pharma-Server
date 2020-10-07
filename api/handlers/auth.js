const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtVerify = require("../handlers/verifyJWT")

const { env_data } = require("../config/data");

const Logger = require("../utils/logger");
const logger = new Logger();

const response = require("../utils/response");

/* User authentication */

const Client = require("../models/client");

/**
 * Return new user token
 * @param {string} email: new clients email
 * @param {string} password: new user's password
 * @return {string} 201: Token
**/
exports.clientReg = async (req, res, next) => {
  console.log(req.body)
  Client.find({ email: req.body.email, nic: req.body.nic })
    .exec()
    .then(client => {
      if (client.length > 0)
        return response(res, null, 409, "User already registered");
      else{
        Client.find({}, (err, clients)=>{
          console.log(clients)
          if(err){
            logger.error(err);
            return response(res, null, 500, err);   
          } else {
            var clientsArray = new Array();
            var relations = new Array();
            clientsArray = clients;
            for(let client of clients) {
              relations = client.relations;
              for(let relation of relations){
                if(relation.email !== req.body.email && relation.nic === req.body.nic){
                  return response(res, null, 200, "Duplicate User!")
                }
              }
            }
          }
        })
      }
        bcrypt.hash(req.body.password, 10, (err, hash) => {

        if (err) {
          logger.error(err);
          return response(res, null, 500, err);
        } else {
          const client = new Client({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            role: "client",
            permission_level:1,
            contact_number: req.body.contact,
            nic:req.body.nic,
            address:req.body.address,
            avatar_url:"",
            // Write image upload
          });

          client
            .save()
            .then(result => {
              logger.info("User created", result);
              const token = jwt.sign(
                {
                  id: result._id,
                  email: result.email,
                  first_name: result.first_name,
                },
                env_data.JWT_SECRET,
                // {
                //   expiresIn: "1h"
                // }
              );

              return response(res, token, 201, "User created");
            })
            .catch(error => {
              logger.error(error);
              return response(res, null, 500, error);
            });
        }
      });
    })
    .catch(err => {
      logger.error("kl"+err);
      return response(res, null, 500, err);
    });
};

exports.clientLogin = async (req, res, next) => {
  Client.find({ email: req.body.email})
    .exec()
    .then(client => {
      console.log(client)
      if (client.length < 1) return response(res, null, 200, "User Not Exists");
      else if(!client[0].is_verified) return response(res, null, 200, "Verifiy Email");
      bcrypt.compare(req.body.password, client[0].password, (err, result) => {
        if (err) {
          logger.error(err);
          return response(res, null, 200, "Auth Failed. Please Retry Again!");
        }

        if (!result) return response(res, null, 200, "Invalid Credentials");

        logger.info(
          "User",
          client[0].first_name,
          "(permission level",
          client[0].last_name,
          ") authorized"
        );
        const token = jwt.sign(
          {
            id: client[0]._id,
            email: client[0].email,
            first_name: client[0].first_name,
          },
          env_data.JWT_SECRET,
          {
            expiresIn: "1h"
          }
        );

        Client.findOneAndUpdate({email: req.body.email}, {$set: {isLoggedIn: true, token: token}}, (err, result) => {
          if(err) {
            logger.error(err);
            return response(res, null, 500, "Server Error");
          } else {
            var date = new Date().getTime();
            date+=(1*60*60*1000)
            logger.info("Success", result);
            return response(res, {
              token: token,
              expireDate: date
            });
          }
        });
      });
    })
    .catch(err => {
      logger.error(err);
      return response(res, null, 500, err);
    });
};

exports.getData = async(req, res) => {
  const token = req.headers['authorization'].slice(6);
  const isVerified = jwtVerify.verifyJWT(token);
  console.log(isVerified)
  if(isVerified.isTrue) {
    const clienId = isVerified.data.id;
    Client.findById(clienId, (err, client) => {
      if(err) {
        logger.error(err);
        return response(res, null, 500, "Server Error!");
      } else {
        logger.info("Success", client);
        return response(res, client, 200, "Success");
      }
    });
  } else {
    logger.error(isVerified);
    return response(res, null, 400, "Token Error!");
  }
}

exports.generatePasswordResetUrl = async (req, res) => {
  const email = req.params.email;
  console.log(email)
  Client.find({email: email}, (err, client) => {

    if(err) {
      logger.error(err);
      return response(res, null, 500, "Server Error");
    } else if (client.length === 0) {
      logger.info("Success", client);
      return response(res, client, 400, "User Not Exists!");
    } else {
      const token = jwt.sign(
        {
          id: client[0]._id,
          email: client[0].email,
          first_name: client[0].first_name,
        },
        env_data.JWT_SECRET,
        {
          expiresIn: "1h"
        }
      );
      logger.info(token);
      logger.info(client);
      return response(res, token, 200, "Success");
    }
  });
}

exports.resetPassword = async (req, res) => {
  const token = req.headers['authorization'].slice(6);
  const isVerified = jwtVerify.verifyJWT(token);
  if(isVerified.isTrue) {
    const email = isVerified.data.email;
    Client.find({ email: email, is_verified: true })
    .exec()
    .then(client => {
      console.log(client)
      if (client.length < 1) return response(res, null, 401, "Auth Failed");
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          logger.error(err);
          return response(res, null, 500, err);
        } else {
          Client.findOneAndUpdate({ email: email }, { $set: { password: hash }}, (error, result) => {
            if(error) {
              logger.error(error);
              return response(res, null, 500, "Server Error");
            } else {
              logger.info("Success", result);
              return response(res, null, 200, "Success!");
            }
          });
        }
      });
    })
    .catch(err => {
      logger.error(err);
      return response(res, null, 500, err);
    });
  } else {
    logger.error(isVerified.isTrue);
    return response(res, null, 200, "Link Expired!");
  }
}

exports.logOut = async (req, res) => {
  const token = req.headers['authorization'].slice(6);
  const isVerified = jwtVerify.verifyJWT(token);
  if(isVerified.isTrue) {
    const clienId = isVerified.data.id;
    Client.findOneAndUpdate({email: isVerified.data.email }, { $set: req.body }, (err, result) => {
      if(err) {
        logger.error(err);
        return response(res, null, 500, "Server Error");
      } else {
        logger.info("Success", result);
        return response(res, null , 200, "Success");
      }
    });
  } else {
    logger.error(isVerified.isTrue);
    Client.findOneAndUpdate({_id: isVerified.data.id }, {$set: {is_token_expired: true}}, (err, result) => {
      if(err) {
        logger.error(err);
        return response(res, null, 500, "Server Error");
      } else {
        logger.info("Success", result);
        return response(res, null, 400, "Bad Request");
      }
    });
  }
}

exports.verifyUser = async(req, res) => {
  const token = req.headers['authorization'].slice(6);
  const isVerified = jwtVerify.verifyJWT(token);
  if(isVerified.isTrue) {
    Client.findOneAndUpdate({_id: isVerified.data.id}, {$set: {is_verified: req.body.isVerified}}, (err, result) => {
      if(err) {
        logger.error(err);
        return response(res, null, 500, "Server Error");
      } else {
        console.log(req.headers)
        logger.info("Success", result);
        if (result.is_verified === true) {
          return response(res, null, 200, "Already Validated!");
        } 
        else return response(res, null, 200, "Success");
      }
    });
  } else {
    logger.error(isVerified.isTrue);
    return response(res, null, 200, "Token Expired");
    // Client.findOneAndUpdate({_id: isVerified.data.id }, {$set: {is_token_expired: true}}, (err, result) => {
    //   if(err) {
    //     logger.error(err);
    //     return response(res, null, 500, "Server Error");
    //   } else {
    //     logger.info("Success", result);
    //     return response(res, null, 400, "Bad Request");
    //   }
    // });
  }
}

exports.deleteAll = async(req, res) => {
  Client.deleteMany({}, (err, result) => {
    if(err) {
      logger.error(err)
      return response(res, null, 500, "Server Error")
    } else {
      logger.info("Success", result)
      return response(res, null, 200, "Success")
    }
  })
}

exports.delete = async(req, res) => {
  Client.deleteMany({_id: req.params.id }, (err, result) => {
    if(err) {
      logger.error(err)
      return response(res, null, 500, "Server Error")
    } else {
      logger.info("Success", result)
      return response(res, null, 200, "Success")
    }
  })
}

exports.addRelationship = async (req, res) => {
  console.log(req.headers['authorization'])
  const token = req.headers['authorization'].slice(6);
  const isVerified = jwtVerify.verifyJWT(token);
  console.log(isVerified)
  if (isVerified.isTrue) {
    logger.info("Success", isVerified);
        const clienId = isVerified.data.id;
        console.log(clienId);
        Client.find({ nic: req.body.relations.nic })
              .exec()
              .then(clients => {
                console.log(clients.length)
                if(clients.length>0 && (clients[0].email !== req.body.relations.email)) {
                  return response(res, null , 200, "User Exists!");
                } else {
                  Client.find({email: req.body.relations.email}, (err, result)=>{
                    if(err){
                      logger.error(err)
                      return response(res, null, 500, "Server Error!")
                    } else if(result.length>0){
                        return response(res, null, 200, 'User Exists!')
                    } else {
                      Client.findById(clienId,(err, client) => {
                        if(err) {
                          logger.error(err);
                          return response(res, null, 500, "Server Error");
                        } else {
                            var relationsArray = new Array();
                            var isPresent = false;
                            //console.log(client)
                            relationsArray = client.relations;
                            for(let relations of relationsArray){
                              if(relations.nic === req.body.relations.nic) {
                                isPresent = true;
                                break;
                              }
                            }
                            if(!isPresent) {
                              relationsArray.push(req.body.relations);
                              console.log(relationsArray)
                              Client.findOneAndUpdate({_id: clienId}, {$set: {relations: relationsArray}}, (err, result) => {
                                if(err) {
                                  logger.error(err);
                                  return response(res, null, 500, "Server Error");
                                } else {
                                    logger.info("Success", result);
                                    return response(res, null, 201, "Success");
                                }
                              });
                            } else {
                              logger.error(err);
                              return response(res, null, 200, "User Exists!");
                            }
                          }
                      });
                    }
                  })
                }
              })
  } else {
    logger.error(isVerified.isTrue);
    Client.findOneAndUpdate({_id: isVerified.data.id }, {$set: {is_token_expired: true}}, (err, result) => {
      if(err) {
        logger.error(err);
        return response(res, null, 500, "Server Error");
      } else {
        logger.info("Success", result);
        return response(res, null, 400, "Bad Request");
      }
    });
  }
  // Client.findOneAndUpdate({_id: req})
}