  const express = require("express");
  const router = express.Router();
  const courseController = require("../controllers/courseController");
  const{verifyToken} = require("../middleware/authMiddleware");
  const{ courseValidation }= require("../middleware/courseValidation");
  
  router.post("/",
      verifyToken,
      courseValidation,
      courseController.createCourse
  );
  
  router.get("/",verifyToken,courseController.getAllCourses);
  
 router.get("/:id", verifyToken, courseController.getCourseById);
  router.put(
      "/:id",
      verifyToken,
      courseValidation,
      courseController.updateCourse
  );
  
  router.delete("/:id",verifyToken,courseController.deleteCourse);
  
  module.exports=router;