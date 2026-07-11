 const express = require("express");
 const router = express.Router();
 
 const teacherController =require("../controllers/teacherController");
 const{verifyToken} = require("../middleware/authMiddleware");
 const{ teacherValidation }= require("../middleware/teacherValidation");
   router.post("/",
       verifyToken,
       teacherValidation,
       teacherController.createTeacher
   );
   
   router.get("/",verifyToken,teacherController.getAllTeachers);
   
  router.get("/:id", verifyToken, teacherController.getTeacherById);
   router.put(
       "/:id",
       verifyToken,
           teacherValidation,
     teacherController.updateTeacher
   );
   
   router.delete("/:id",verifyToken,teacherController.deleteTeacher);
   
   module.exports=router;