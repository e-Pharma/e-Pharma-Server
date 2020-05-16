const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const response = require("../utils/response");

const Logger = require("../utils/logger");
const logger = new Logger();

exports.sendVerification = async (req, res) => {
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