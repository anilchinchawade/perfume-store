const express = require("express");
const router = express.Router();

const {
    createOrder,
    getOrders,
    getMyOrders,
    getOrderById,
    getDashboardStats,
    markOrderPaid,
    markOrderDelivered,
} = require("../controllers/orderController");

// CREATE ORDER
router.post("/", createOrder);

// GET ALL ORDERS
router.get("/", getOrders);
router.get("/admin/dashboard", getDashboardStats);
router.put("/:id/pay", markOrderPaid);
router.put("/:id/deliver", markOrderDelivered);
router.get("/:id", getOrderById);
router.get("/my/:phone", getMyOrders);


module.exports = router;
