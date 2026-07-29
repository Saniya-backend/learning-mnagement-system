  const express = require("express");
  const router = express.Router();
  const courseController = require("../controllers/courseController");
  const{verifyToken} = require("../middleware/authMiddleware");
  const{ courseValidation }= require("../middleware/courseValidation");
  const { authorizeRoles } = require("../middleware/roleMiddleware");
  router.post("/",
      verifyToken,
   authorizeRoles("admin", "teacher"),courseValidation,
      courseController.createCourse
  );
   
  router.get("/",verifyToken,authorizeRoles("admin", "teacher","user"),courseController.getAllCourses);
  
 router.get("/:id", verifyToken, courseController.getCourseById);
  router.put(
      "/:id",
      verifyToken,authorizeRoles("admin", "teacher"),
      courseValidation, 
      courseController.updateCourse
  );
  
  router.delete("/:id",verifyToken,authorizeRoles("admin", "teacher"),courseController.deleteCourse);
  
  module.exports=router;