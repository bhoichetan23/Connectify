
const mongoose= require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");



const userSchema= new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        minLenght:4,
        maxLength:20
    },
    lastName:{
        type: String
    },
    emailId:{
        type: String,
        required:true,
        unique:true,
        lowercase: true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                 throw new Error("email not valid");
                 
            }

        }


    },
    password:{
        type: String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                 throw new Error("please enter a strong password");
                 
            }

        }
    },
    age: {
        type: String,
        minLength:18
    },
    gender:{
        type: String,
        validate(value){
            if(value.includes(!["male","female","others"])){
                 throw new Error("Gender data is not valid");
                 
            }

        }
        
    },
    photoUrl:{
        type: String,
        validate(value){
            if(!validator.isURL(value)){
                 throw new Error("photo url not valid");
                 
            }

        }
    },
    about:{
        type: String,
        default: "This is default  about the user"

    },
    skills:{
        type: [String]
    }
   

},{
    timestamps:true
});

userSchema.methods.getJWT= async function(){
    const user=this;
    const token= await jwt.sign({_id:user._id,},process.env.JWT_SECRET,{expiresIn:"7d"});
    return token;
};

userSchema.methods.validatePassword= async function (passwordInputByUser){
    const user=this;
    const passwordHash= user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

const User = mongoose.model("User", userSchema);

module.exports= User;

