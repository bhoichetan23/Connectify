const express = require("express");
const userAuth = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const { Connection } = require("mongoose");
const ConnectionRequest = require("../models/connectionRequest");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res)=>{
  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;


    // Check if there is an existing connection request

    const existingConnectionRequest = await ConnectionRequest.findOne({
        $or:[
            {fromUserId,toUserId},
            {fromUserId: toUserId, toUserId: fromUserId}
        ]
    });

    if(existingConnectionRequest){
        return res.status(400).send(`message: Connection request already sent!!`);

    }

    const allowedStatus = ["interest","ignored"];
    if(!allowedStatus.includes(status)){
        return res.status(400).json({message: "Invalid status type:" + status});
    }

    const toUser = await connectionRequest.findById({toUserId});
    if(!toUser){
      return res.status(404).json({message: "User not found!"});

    }

    if(fromUserId.equals(toUserId)){
      return res.status(400).json({message: "You cannot make connection request to yourself "});

    }

    const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status
    });

    const saveRequest = await ConnectionRequest.save();

    res.json({
        message: req.user.firstName + "is" + status + "in" + toUser.firstName,
        saveRequest
    });




  }
  catch(err){
    res.status(400).send("ERROR" + err.message);

  }

  

});

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req,res) =>{
  try{
    // validate the status

    const loggedInUser = req.user;
    const {status, requestId } = req.params;
    
    const allowedStatus = ["accepted","rejected"];

    if(!allowedStatus.includes(status)){
        return res.status(400).json({message: "Status not allowed"});
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id : requestId,
      toUserId : loggedInUser._id,
      status : "interested"
    });

    if(!connectionRequest){
      res.status(404).json({message: "Connection request not found"});

    }
    

    connectionRequest.status = status;

    const data = await connectionRequest.save();

    res.json({message: "Connection request" + status, data});

  }
  catch(err){
    res.status(400).send("ERROR:" + err.message);

  }

});


module.exports = requestRouter;
