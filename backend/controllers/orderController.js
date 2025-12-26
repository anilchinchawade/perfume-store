const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            totalPrice,
            paymentMethod = "GPay QR",
            paymentStatus = "Pending",
        } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: "No order items" });
        }

        const order = await Order.create({
            orderItems,
            shippingAddress,
            totalPrice,
            paymentMethod,
            paymentStatus,
            isPaid: false,
            isDelivered: false,
        });

        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Order creation failed" });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};

// MARK ORDER AS PAID (Admin)
exports.markOrderPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.isPaid = true;
        order.paymentStatus = "Paid";
        order.paidAt = new Date();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: "Failed to mark order paid" });
    }
};

// MARK ORDER AS DELIVERED (Admin)
exports.markOrderDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.isDelivered = true;
        order.deliveredAt = new Date();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: "Failed to mark order delivered" });
    }
};

// GET ORDERS BY CUSTOMER PHONE
exports.getMyOrders = async (req, res) => {
    try {
        const { phone } = req.params;

        const orders = await Order.find({
            "shippingAddress.phone": phone,
        }).sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch customer orders" });
    }
};

// GET ORDER BY ID (Public)
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch order" });
    }
};


