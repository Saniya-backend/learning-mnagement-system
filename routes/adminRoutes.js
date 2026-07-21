const express = require("express");
const router = express.Router();

const { getAdminDashboard } = require("../controllers/adminController");
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get(
    "/dashboard",
    verifyToken,
    authorizeRoles("admin"),
    getAdminDashboard
);


module.exports = router;