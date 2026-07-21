 const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlistController");
const{ verifyToken }= require("../middleware/authMiddleware")
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { playlistValidation } = require("../middleware/playlistValidation");

  router.post("/",
      verifyToken, playlistValidation,  
      authorizeRoles("admin", "teacher"),
    playlistController.createPlaylist
  );
  
  router.get("/",verifyToken, authorizeRoles("admin", "teacher","user"),playlistController.getAllPlaylists);
  
 router.get("/course/:course_id",verifyToken,authorizeRoles("admin", "teacher","user"), playlistController.getPlaylistByCourse);
  router.put(
      "/:id",
      verifyToken,
      authorizeRoles("admin", "teacher"),
      playlistController.updatePlaylist
  );
  
  router.delete("/:id",verifyToken,authorizeRoles("admin", "teacher"),playlistController.deletePlaylist);
  
  module.exports=router;