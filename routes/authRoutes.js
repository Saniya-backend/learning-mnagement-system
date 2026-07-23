const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const{verifyToken}=require("../middleware/authMiddleware");   
const { authorizeRoles } = require("../middleware/roleMiddleware");
const{
    signupValidation,
    loginValidation
}=require("../middleware/authValidation");
router.post("/signup",signupValidation,authController.signup);

router.post("/login",loginValidation,authController.login);
router.get(
    "/profile/:id",
    verifyToken,
    authController.getProfile
);

router.put(
    "/profile/:id",
    verifyToken,
    authController.updateProfile
);

router.put(
    "/change-password/:id",
    verifyToken,
    authController.changePassword
);
router.post("/logout", verifyToken, authController.logout);

router.get("/users",verifyToken,authorizeRoles("admin"),authController.getAllUsers);

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
