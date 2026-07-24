const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");

const {verifyToken} = require("../middleware/authMiddleware");
const {authorizeRoles} = require("../middleware/roleMiddleware");



router.post(
    "/",
    verifyToken,
    paymentController.createPayment
);



router.get(
    "/",
    verifyToken,
    authorizeRoles("admin"),
    paymentController.getAllPayments
);



router.get(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    paymentController.getPaymentById
);



module.exports = router;