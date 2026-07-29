 const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const{ verifyToken }= require("../middleware/authMiddleware")
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { videoValidation } = require("../middleware/videoValidation");

  router.post("/",
      verifyToken,authorizeRoles( "teacher"), videoValidation,  
      
    videoController.createVideo
  );
  
  router.get("/",verifyToken, authorizeRoles("admin", "teacher","user"),videoController.getAllVideos);
  
 router.get("/playlist/:playlist_id",verifyToken,authorizeRoles("admin", "teacher","user"), videoController.getVideoByPlaylist);
  router.put(
      "/:id",
      verifyToken,
      authorizeRoles( "teacher"),
      videoController.updateVideo
  );
  
  router.delete("/:id",verifyToken,authorizeRoles( "teacher"),videoController.deleteVideo);
  
  module.exports=router;