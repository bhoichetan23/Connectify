const mongoose = require("mongoose");



const connectionRequestSchema = new mongoose.Schema({
    fromRequestId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Reference to the user collection
        required: true

    },

    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true

    },

    status:{
        type: String,
        enum: {
            values: ["ignored", "interested","accepted","rejected"],
            message: `{VALUE} is incorrect status type`
        }

    }

    
}, {timestamps: true});

connectionRequestSchema.index({fromUserId: 1, toUserId: 1});

connectionRequestSchema.pre("save", function (){
    ConnectionRequest = this;

    // check if fromUserId is same as toUserId

    // if(ConnectionRequest.fromRequestId.equals(ConnectionRequest.toUserId)){
    //     throw new Error("Connot send vonnection request to yourself");

    // }
    // next();
});

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;