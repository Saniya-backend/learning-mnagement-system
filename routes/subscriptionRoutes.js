const express = require("express");
const router = express.Router();

const subscriptionController = require("../controllers/subscriptionController");
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get(
    "/",
    verifyToken,
    authorizeRoles("admin"),
    subscriptionController.getAllSubscriptions
);

router.get(
    "/:id",
    verifyToken,authorizeRoles("admin"),
    subscriptionController.getSubscriptionById
);

router.put(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    subscriptionController.updateSubscriptionStatus
);

router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    subscriptionController.deleteSubscription
);

module.exports = router;