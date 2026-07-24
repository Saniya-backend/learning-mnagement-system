const express = require("express");
const router = express.Router();

const planController = require("../controllers/planController");
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");


router.post("/", verifyToken, authorizeRoles("admin"), planController.createPlan);

router.get("/", verifyToken, planController.getAllPlans);

router.get("/:id", verifyToken, planController.getPlanById);

router.put("/:id", verifyToken, authorizeRoles("admin"), planController.updatePlan);

router.delete("/:id", verifyToken, authorizeRoles("admin"), planController.deletePlan);


module.exports = router;