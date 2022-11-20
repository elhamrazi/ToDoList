const jwt = require('jsonwebtoken');
const config = require('config');

const jwtToken = config.get('jwtSecret');

function verifyAuth(req, res, next) {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if(!token) {
        return res.status(403).send('Token is required.');
    }
    try{
        const decoded = jwt.verify(token, jwtToken);
        req.user = decoded;
        console.log("****************************");
        console.log(decoded);
        console.log("****************************");
    }
    catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}

module.exports = verifyAuth;