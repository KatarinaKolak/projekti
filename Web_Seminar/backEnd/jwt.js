import jwt from 'jsonwebtoken';

export function signJwt(user_id) {
    const token = jwt.sign({user: user_id}, process.env.SECRET);
    if (!token) return false;
    return token;
}

export function verifyJwt(req, res, next) {
    const authorization = req.header('authorization');
    const token = authorization ? authorization.split('Bearer ')[1] : undefined;
    if(!token) {
        return res.status(401).send("Unauthorized! Wrong token.");
    }
    jwt.verify(token, process.env.SECRET, (err, payload)=>{
        if (err || !payload.user) {
            return res.status(401).send("Unauthorized! Error.");
        }
        return next();
    })
}
