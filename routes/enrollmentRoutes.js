const express = require("express");
const router = express.Router();

const enrollmentController =require("../controllers/enrollmentController");
const{verifyToken} = require("../middleware/authMiddleware");
const{ enrollmentValidation }= require("../middleware/enrollmentValidation");

router.post("/",
    verifyToken,
    enrollmentValidation,
    enrollmentController.createEnrollment
);

router.get("/",verifyToken, enrollmentController.getAllEnrollments);

router.get("/:id",verifyToken,enrollmentController.getEnrollmentById);


router.delete("/:id",verifyToken,enrollmentController.deleteEnrollments);

module.exports=router;