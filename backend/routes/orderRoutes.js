const express = require("express");
const router = express.Router();

const {
    createOrder,
    getOrders,
    markOrderPaid,
    markOrderDelivered,
    getDashboardStats,
} = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/", getOrders);

// ADMIN DASHBOARD (THIS IS CRITICAL)
router.get("/admin/dashboard", getDashboardStats);

router.put("/:id/pay", markOrderPaid);
router.put("/:id/deliver", markOrderDelivered);

module.exports = router;

