exports.signupValidation = (req, res, next) => {
  const { name, email, password ,role} = req.body;
  if(role !=="teacher" && role !=="user")
  {
    return res.status(400).json({
      message:"Invalid Role",
    })
  }

   const missingFields = [];

    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
  
    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `${missingFields.join(", ")} fields are required`
        });
    }

  
next();
}

exports.loginValidation=(req,res,next)=>{
    
    const{email,password}=req.body;
    if(!email||!password)
    {
      return res.status(400).json({
       message:"Email and password Required"
      });
    }
      next();
};