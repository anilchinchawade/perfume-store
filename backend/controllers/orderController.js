const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress, totalPrice } = req.body;

        if (orderItems.length === 0) {
            return res.status(400).json({ message: "No order items" });
        }

        const order = await Order.create({
            orderItems,
            shippingAddress,
            totalPrice,
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: "Order creation failed" });
    }
};

exports.getOrders = async (req, res) => {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
};
