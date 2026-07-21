const express = require("express");
const router = express.Router();

const enrollmentController =require("../controllers/enrollmentController");
const{verifyToken} = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post("/",
    verifyToken,
  
    enrollmentController.createEnrollment
);

router.get("/",verifyToken, authorizeRoles("admin"),enrollmentController.getAllEnrollments);

router.get("/:id", authorizeRoles("admin"),verifyToken,enrollmentController.getEnrollmentById);


router.delete("/:id",verifyToken,authorizeRoles("admin"),enrollmentController.deleteEnrollments);

module.exports=router;