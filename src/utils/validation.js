const validator=require("validator");

const validateSignUpData=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;
      if(!firstName || !lastName){
          throw new Error("Please enter a valid name");
      }
      else if(!validator.isEmail(emailId)){
        throw new Error("Please enter a valid email address");
      }
      else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
      }
}

module.exports=validateSignUpData;


const validateEditeProfileData = (req) =>{
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "skills",
    "about"
  ]

  const isEditAllowed = object.keys(req.body).every((field) =>
    isEditAllowed.includes(field)
  
  )
  return isEditAllowed;
};


module.exports = {
  validateSignUpData,
  validateEditeProfileData,
}

