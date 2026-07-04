const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const{verifyToken}=require("../middleware/authMiddleware");   
const{
    signupValidation,
    loginValidation
}=require("../middleware/authValidation");
router.post("/signup",signupValidation,authController.signup);

router.post("/login",loginValidation,authController.login);
router.get("/profile/:id",authController.getProfile);
router.put("/profile/:id",authController.updateProfile);
router.put("/change-password/:id",authController.changePassword);


router.get("/test",verifyToken,(req,res)=>
{
    res.status(200).json(
        {
            message:"Protected Route working",
            user:req.user
        }
    );
})


module.exports=router;
