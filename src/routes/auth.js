const express = require("express");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

const validateSignUpData = require("../utils/validation");

const User = require("../models/user");

authRouter.post("/signup", async (req,res)=>{
   
    try{
     // Validaton of data
       validateSignUpData(req);
     const {firstName,lastName,emailId,password}=req.body;
       
 
 
    // Encrypt the password
    const passwordHash= await bcrypt.hash(password,10);
    
 
    // creating new instance of user model
    const user= new User({
       firstName,
       lastName,
       emailId,
       password: passwordHash,
    });
 
  
    await user.save();
    res.send("user saved successfully");
   } catch(err){
    res.status(400).send("Error occurred while saving the user"+ err.message);
   }
 
 });
 
 authRouter.post("/login",async(req,res)=>{
     try{
       const {emailId,password}=req.body;
      
 
       const user= await User.findOne({emailId:emailId});
       if(!user){
          throw new Error("Invalid credentials");
 
       }
 
       const isPasswordValid= await user.validatePassword(password);
       if( user && isPasswordValid){
 
          // Create a JWT token
          const token = await user.getJWT();
 
          res.cookie("token",token);
          res.send("Login Successful");
       }
       else{
          throw new Error("Invalid credentials");
       }
 
     }catch(err){
       res.status(400).send("something went wrong");
    }
 
 })
 
 
 



module.exports = authRouter;