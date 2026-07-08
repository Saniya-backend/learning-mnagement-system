exports.signupValidation = (req, res, next) => {
  const { name, email, password ,role} = req.body;
  if(role !=="teacher" && role !=="user")
  {
    return res.status(400).json({
      message:"Invalid Role",
    })
  }

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields required",
    });


    
  }
next();
};

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