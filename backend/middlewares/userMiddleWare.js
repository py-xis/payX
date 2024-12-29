const zod = require("zod");

const userObject = zod.object({
    email : zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string()
});

const userSignInObject = zod.object({
    email : zod.string().email(),
    password : zod.string()
});



function validateUserObject(req, res, next){

    const body = req.body;

    let isValid = userObject.safeParse(body);
    
    if(!isValid.success){
        res.status(400).json({
            "message" : "Bad Request, Missing or Invalid Input Fields"
        });
    }else{
        req.data = isValid.data;
        next();
    }
}

function validateUserSignInObject(req, res, next){

    const body = req.body;

    let isValid = userSignInObject.safeParse(body);
    
    if(!isValid.success){
        res.status(400).json({
            "message" : "Bad Request, Missing or Invalid Input Fields"
        });
    }else{
        req.data = isValid.data;
        next();
    }
}


module.exports = {
    validateUserObject,
    validateUserSignInObject
}