const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res) => {
  const { name, email, password,role} = req.body;

  try {
    db.query("SELECT * FROM users WHERE email=?",
      [email],
      async (err, result) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
        if (result.length > 0) {
          return res.status(400).json({
            message: "Email already exists",
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        db.query("INSERT INTO users (name,email,password,role) VALUES(?,?,?,?)",[
          name, email, hashedPassword,role
        ],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                message: err.message,
              });
            }
            return res.status(201).json({
              message: "User registered Successfully",
            });
          });
      },
    );
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
  //login

  exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query(
      "Select * From Users Where email= ?",
      [email],
      async (err, result) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        if (result.length == 0) {
          return res.status(404).json({
            message: "user not found ",
          });
        }
        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({
            message: "invalid Password",
          });
        }

        const token = jwt.sign(
          {
            id: user.user_id,
            role: user.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" },
        );
        res.status(200).json({
          message: "Login Successful ",
          token,
        });
      },
    );
  };

  //get profile
  exports.getProfile = (req, res) => {
    const{id}=req.params;
     db.query(
      "SELECT user_id,name,email,role FROM users WHERE user_id=?",
         [id],
         (err,result)=>
         {
          if(err)
          {
            return res.status(500).json({
              message:err.message
            });
          }
          if (result.length===0)
          {
            return res.status(404).json({
              message:"User Not Found"
            });
          }
          return res.status(200).json(result[0]);
         }
        );
  };
  //update profile
  exports.updateProfile = (req, res) => {
    const{id}= req.params;
    const{name,email}=req.body;

    db.query("UPDATE users SET name=?,email=? WHERE user_id=?",
      [name,email,id],
      (err,result)=>{
         
        if(err){
             return res.status(500).json(
              {
                message:err.message
              }
             );

        }
            if(result.affectedRows===0)
            {
              return res.status(404).json({
                message:"user Not Found"
              });
            }
            return res.status(200).json(
              {
                message:"profile Updated successfully "
              }
            );
      }
    )
  };
  //change password
  exports.changePassword = (req, res) => {

    const {id}=req.params;
    const{oldPassword,newPassword}=req.body;
    db.query(
      " SELECT * FROM users Where user_id=?",
      [id],
      async(err,result)=>
      {
        if(err){
             return res.status(500).json(
             {
              message:err.message
             }
             );
        }
        if(result.length===0)
        {
          return res.status(404).json(
            {
              message:"User not Found"
            }
          );
        }
        const user=result[0];

        const isMatch =await bcrypt.compare(
          oldPassword,
          user.password
        );
        if (!isMatch)
          return res.status(400).json(
        {
          message:"Old Password incorrect"
        });
      
      
      const hashedPassword= await bcrypt.hash(
        newPassword,10
      );

      db.query(
        "UPDATE users SET password=? WHERE user_id=?",
        [hashedPassword,id],
        (err,result)=>
        {
          if(err)
          {
            return res.status(500).json(
              {
                message:err.message
              }
            );
          }
          return res.status(200).json(
            {
              message:"password change successfully "
            }
          );
        }
      );
    }
  )
}
      
