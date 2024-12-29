const express = require("express");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const {connectToDatabase} = require("../db");
const {validateUserObject} = require("../middlewares/userMiddleWare");
const {validateUserSignInObject} = require("../middlewares/userMiddleWare");
const JWT_SECRET = require("../config");


const userRouter = express.Router();

userRouter.post("/signup", validateUserObject, async (req, res) => {
    try {
        const data = req.data; // Extract validated data from middleware

        // Connect to the database
        const dbInstance = await connectToDatabase();
        const usersCollection = dbInstance.collection("Users");

        // Check if the user already exists
        const existingUser = await usersCollection.findOne({ email: data.email });
        if (existingUser) {
            return res.status(409).json({
                message: "User with the given email already exists.",
            });
        }

        // Create a new user object with hashed password
        const newUser = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            passwordHash: await argon2.hash(data.password),
        };

        // Insert the new user into the database
        const result = await usersCollection.insertOne(newUser);

        if (result.acknowledged) {
            const token = jwt.sign(result.insertedId.toString(), JWT_SECRET);;
            return res.status(200).json({
                message : "User created successfully",
                token   : token
            });
        } else {
            throw new Error("Failed to insert user");
        }
    } catch (err) {
        console.error("Error during signup:", err.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});


userRouter.post("/signin", validateUserSignInObject, async(req,res) =>{

    try{

        const data = req.data;

        const dbInstance = await connectToDatabase();
        const usersCollection = dbInstance.collection("Users");

        const existingUser = await usersCollection.findOne({ email: data.email });

        if(!existingUser){
            res.status(411).json({
                "message" : "User Does Not Exist"
            });
        }

        const passwordHash = existingUser.passwordHash;

        const isValidPassword = await argon2.verify(passwordHash, data.password);
        if(isValidPassword){
            const token = jwt.sign(existingUser._id.toString(), JWT_SECRET);

            res.status(200).json({token   : token });

        }else{
            res.status(411).json(
                {
                    message: "Error while logging in"
                }
            );
        }
    }catch(err){
        console.log(err);
        res.status(500).send("Internal Sever Error");
    }
});

module.exports = userRouter;