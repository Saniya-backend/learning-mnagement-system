const express = require("express");
const router = express.Router();

const authController =require("../controllers/authController");

const{
    signupValidation,
    loginValidation
}=require("../middleware/authValidation");
router.post("/signup",signupValidation,authController.signup);

router.post("/login",loginValidation,authController.login);
router.get("/profile/:id",authController.getProfile);
router.put("/profile/:id",authController.updateProfile);
router.put("/change-password",authController.changePassword);

module.exports=router;
