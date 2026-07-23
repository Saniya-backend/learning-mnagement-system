const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");
const{verifyToken} = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
router.post("/", verifyToken,authorizeRoles("teacher","admin"),planController.createPlan);
router.get(
  "/",
  verifyToken,
  authorizeRoles("teacher", "user", "admin"),
  planController.getAllPlans
);
router.get("/course/:course_id",authorizeRoles("teacher","user","admin") ,planController.getPlansByCourse);
router.get("/:id",verifyToken,authorizeRoles("teacher","user","admin"), planController.getPlanById);
router.put("/:id", verifyToken,authorizeRoles("teacher","admin"),planController.updatePlan);

router.delete("/:id",verifyToken,authorizeRoles("teacher","admin"),planController.deletePlan);

module.exports = router;