require("dotenv").config();
const jwt = require('jsonwebtoken');


function signJwt(user_id) {
    const token = jwt.sign({sub: user_id}, process.env.SECRET);
    if (!token) return false;
    return token;
}

function verifyJwt(req, res, next) {
    const authorization = req.header('authorization');
    const token = authorization ? authorization.split('Bearer ')[1] : undefined;
    if(!token) {
        return res.status(401).send("Unauthorized");
    }
    jwt.verify(token, process.env.SECRET, (err, payload)=>{
        if (err || !payload.sub) {
            return res.status(401).send("Unauthorized");
        }
        return next();
    })
}

module.exports = {signJwt, verifyJwt};