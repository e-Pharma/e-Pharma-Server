const Logger = require("../utils/logger");
const logger = new Logger();
const response = require("../utils/response");

exports.calculateImageQuality = async (req, res, next) => {
    console.log("hello")
    const spawn  = require('child_process').spawn
    const pythonProcess = spawn('python3', ['./image_clarity.py'])
    pythonProcess.stdout.on('data', (data) => {
        var buffer = Buffer.from(data)
        const brisqueValue = parseFloat(buffer.toString());
        console.log(brisqueValue)
        if(brisqueValue > 15) return response(res, {isQuality: true}, 200, "Success");
        else return response(res, {isQuality: false}, 200, "Success")
    });
    // console.log("jcn"+req.files);
}