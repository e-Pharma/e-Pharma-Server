// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
const { env_data } = require("../config/data")
var STORAGE = env_data.storage
require('dotenv').config()
// var credentials = new AWS.SharedIniFileCredentials({profile: 'SriLankanOrganics'})
// console.log(credentials)
// AWS.config.credentials = credentials;
// Set the region 
// AWS.config.update({region: STORAGE.REGION});

// Create S3 service object
const s3 = new AWS.S3(
    {
        apiVersion: STORAGE.API_VERSION,
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        region: STORAGE.REGION,
    }
);

// Create the parameters for calling createBucket
var bucketParams = {
  Bucket : STORAGE.BUCKET_NAME,
  ACL : STORAGE.ACL,
  CreateBucketConfiguration: {
    LocationConstraint: STORAGE.REGION
  }
};

// call S3 to create the bucket
const createBucket = async() => {
    s3.createBucket(bucketParams, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.Location);
        }
    });   
}

const export_params = {
    createBucket: createBucket,
    s3: s3,
    params: bucketParams
}

module.exports.export_params = export_params