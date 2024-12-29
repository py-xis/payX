const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

async function authorizationMiddleware(req,res,next){

    const authorization = req.body;

    if(!authorization || !authorization.startsWith('Bearer')){
        res.status(403).json({
            "message" : "Invalid Authentication Token"
        });
    }

    const token = authorization.split(' ')[1];

    try{

        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded;

        next();

    }catch(err){
        console.log("authMiddleware.sj:authorizationMiddleware:An error Occured", err);
        res.status(500).json({
            "message" : "An Error Occured on Our Side"
        });
    }
}

module.exports = authorizationMiddleware;

