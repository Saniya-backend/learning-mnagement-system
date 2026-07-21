 const express = require("express");
 const router = express.Router();
 
 const teacherController =require("../controllers/teacherController");
 const{verifyToken} = require("../middleware/authMiddleware");
 const{ teacherValidation }= require("../middleware/teacherValidation");
 const { authorizeRoles } = require("../middleware/roleMiddleware");
   router.post("/",
       verifyToken,
       teacherValidation,  authorizeRoles("admin"),
       teacherController.createTeacher
   );
   
   router.get("/",verifyToken,  authorizeRoles("admin","teacher"),teacherController.getAllTeachers);
   
  router.get("/:id", verifyToken,  authorizeRoles("admin","teacher"), teacherController.getTeacherById);
   router.put(
       "/:id",
       verifyToken,  authorizeRoles("admin"),
           teacherValidation,
     teacherController.updateTeacher
   );
   
   router.delete("/:id",verifyToken,  authorizeRoles("admin"),teacherController.deleteTeacher);
   
   module.exports=router;