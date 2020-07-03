const jwt = require("jsonwebtoken");
const { env_data} = require('../../api/config/data');
const Logger = require("../utils/logger");
const logger = new Logger();

exports.verifyJWT = function(token) {
    // console.log(data)
    try {
        const data = jwt.verify(token, env_data.JWT_SECRET);
        if ( data !== undefined || data !== null)  {
            return {isTrue: true, data: data};
        } else {
            return {isTrue: false, data: null}
        }
    } catch(ex) {
        logger.error(ex);
        return {isTrue: false, data: null};
    }
}