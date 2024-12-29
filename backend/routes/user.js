const express = require("express");
const {validateUserObject} = require("../middlewares/userMiddleWare");
const {validateUserSignInObject} = require("../middlewares/userMiddleWare");
const authorizationMiddleware = require("../middlewares/authMiddleware");


const userRouter = express.Router();

userRouter.post("/signup", validateUserObject, signup);

userRouter.post("/signin", validateUserSignInObject, );

userRouter.put("/", authorizationMiddleware, );

module.exports = userRouter;