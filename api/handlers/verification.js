const sgMail = require('@sendgrid/mail');

const response = require("../utils/response");

const Logger = require("../utils/logger");
const logger = new Logger();

exports.sendVerification = async (req, res) => {
    sgMail.setApiKey("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");
    const msg = {
        to: req.body.to,
        from: req.body.from,
        subject: req.body.subject,
        text: 'Verifiy Your Email',
        html: req.body.message,
    };

    sgMail.send(msg).then((messageID) => {
        logger.info("Successfully Sent", messageID)
        response(res, null);
    }).catch(err => {
        logger.error(err)
        response(res, null, 471, err)
    })
}