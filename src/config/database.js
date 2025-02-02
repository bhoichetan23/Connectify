const mongoose = require("mongoose");

const connectDB = async()=>{

  await mongoose.connect("mongodb+srv://Devtinder:DevTinder123@cluster0.jwbqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
  
};

module.exports = connectDB;




