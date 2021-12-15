const jwt = require("jsonwebtoken");
const config = require("./config");

const secret =config.jwt.secret;
//expiresIn:"60s" "1h" // expires in 24 hours
const token =  (payload) => {
    const token =   jwt.sign(payload,secret, {expiresIn: "72h" } 
    );
    return token
  };

const verify = (token) => {
    const payload = jwt.verify(token, secret);
    return payload
 };

module.exports = {token,verify}