const express = require("express");
const router = express.Router();

const {
    createOrder,
    getOrders,
    getMyOrders,
    markOrderPaid,
    markOrderDelivered,
} = require("../controllers/orderController");

// CREATE ORDER
router.post("/", createOrder);

// GET ALL ORDERS
router.get("/", getOrders);

router.put("/:id/pay", markOrderPaid);
router.put("/:id/deliver", markOrderDelivered);
router.get("/my/:phone", getMyOrders);


module.exports = router;
