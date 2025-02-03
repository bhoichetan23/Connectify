const express = require("express");

const profileRouter = express.Router();

const userAuth= require("../middlewares/auth");

const { validateEditeProfileData }= require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req,res)=>{
    try{
       const user= req.user;
       res.send(user);
    } catch (err){
       res.status(400).send("ERROR:"+err.message);
    }
 });

 module.exports = profileRouter;

 profileRouter.patch("/profile/edit", userAuth, async (req,res)=>{
   try{
      const user= req.user;

      if(!validateEditeProfileData(req)){
         throw new error("Invalid edit request");

      }

   

      Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
     
   } catch (err){
      res.status(400).send("ERROR:"+err.message);
   }
});

module.exports = profileRouter;