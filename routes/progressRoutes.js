 const express = require("express");
 const router = express.Router();
 
 const progressController =require("../controllers/progressController");
 const{verifyToken} = require("../middleware/authMiddleware");

   router.post("/complete",
       verifyToken,
       
       progressController.markVideoComplete
   );
   
   router.get("/:course_id",verifyToken,progressController.getCourseProgress);
   module.exports = router;