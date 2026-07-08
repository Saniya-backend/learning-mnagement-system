 const express = require("express");
 const router = express.Router();
 
 const teacherController =require("../controllers/teacherController");
 const{verifyToken} = require("../middleware/authMiddleware");
 
   router.post("/",
       verifyToken,
       
       teacherController.createTeacher
   );
   
   router.get("/",verifyToken,teacherController.getAllTeachers);
   
  router.get("/:id", verifyToken, teacherController.getTeacherById);
   router.put(
       "/:id",
       verifyToken,
    
     teacherController.updateTeacher
   );
   
   router.delete("/:id",verifyToken,teacherController.deleteTeacher);
   
   module.exports=router;