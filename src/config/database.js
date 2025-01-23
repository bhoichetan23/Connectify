const mongoose = require("mongoose");

const connectDB = async()=>{

  await mongoose.connect("mongodb+srv://Devtinder:aVUL818ru5pCY8tf@cluster0.jwbqj.mongodb.net/DevTinder");
  
};

module.exports = connectDB;




