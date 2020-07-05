// // const sgMail = require('@sendgrid/mail');

// // const response = require("../utils/response");

// // const Logger = require("../utils/logger");
// // const logger = new Logger();

// // exports.sendPasswordResetLink = async (req, res) => {
// //     console.log(req.body)
// //     sgMail.setApiKey("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");
// //     const msg = {
// //         to: req.body.to,
// //         from: req.body.from,
// //         subject: req.body.subject,
// //         text: 'Reset Password',
// //         html: req.body.message,
// //     };

// //     sgMail.send(msg, (err, result) => {
// //         if(err) {
// //             logger.error(err);
// //             return response(res, null, 471, err);
// //         } else {
// //             logger.info("Success", result)
// //             return response(res, null, 200, "Successfully Sent!");   
// //         }
// //     });

// //     // sgMail.send(msg).then((messageID) => {
// //     //     logger.info("Successfully Sent", messageID)
// //     //     response(res, null);
// //     // }).catch(err => {
// //     //     logger.error(err)
// //     //     response(res, null, 471, err)
// //     // })
// // }

// var mailgun = require("mailgun-js");
// const response = require("../utils/response");
// require('dotenv').config()
// var api_key = process.env.MAIL_GUN_API;
// var DOMAIN = process.env.MAIL_GUN_DOMAIN;
// var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});
// const Logger = require("../utils/logger");
// const logger = new Logger();

// exports.sendPasswordResetLink = async (req, res) => {
//     console.log(req.body)
//     const msg = {
//         to: req.body.to,
//         from: req.body.from,
//         subject: req.body.subject,
//         text: 'Reset Password',
//         html: req.body.message,
//     };

//     mailgun.messages().send(msg, function (err, body) {
//         if(err) {
//             logger.error(err);
//             return response(res, null, 471, err);
//         } else {
//             logger.info("Success", body)
//             return response(res, null, 200, "Successfully Sent!");   
//         }
//     });

// }