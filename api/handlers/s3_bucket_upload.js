// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

const Logger = require("../../api/utils/logger");
const logger = new Logger();

const response = require("../../api/utils/response");

const { export_params } = require('../config/s3_cofig');
const s3 = export_params.s3;
const uploadParams = export_params.params

exports.uploadPrescriptionImage = async(req, res) => {
    var file = req.files
    console.log(file.file.name)
    uploadParams.Body = file.file.data
    uploadParams.Key = "Orders/" + file.file.name
    console.log(uploadParams)

    s3.upload(uploadParams, function(err, data) {
        if (err) {
            console.log("Error", err);
            // logger("Error Uploading!", err);
            return response(res, err, 500, "Internal Server Error!")
        }
        if (data) {
            console.log("Upload Success", data.Location);
            return response(res, { url: data.Location }, 200, "Successfully Uploaded!");
        }
    });

}