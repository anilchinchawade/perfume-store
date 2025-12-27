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

// ADMIN DASHBOARD STATS
// exports.getDashboardStats = async (req, res) => {
//     try {
//         const totalOrders = await Order.countDocuments();

//         const totalRevenueAgg = await Order.aggregate([
//             { $match: { isPaid: true } },
//             { $group: { _id: null, total: { $sum: "$totalPrice" } } },
//         ]);

//         const totalRevenue = totalRevenueAgg[0]?.total || 0;

//         const pendingPayments = await Order.countDocuments({ isPaid: false });
//         const deliveredOrders = await Order.countDocuments({ isDelivered: true });

//         // Orders per day (last 7 days)
//         const salesByDate = await Order.aggregate([
//             {
//                 $group: {
//                     _id: {
//                         $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
//                     },
//                     count: { $sum: 1 },
//                 },
//             },
//             { $sort: { _id: 1 } },
//             { $limit: 7 },
//         ]);

//         res.json({
//             totalOrders,
//             totalRevenue,
//             pendingPayments,
//             deliveredOrders,
//             salesByDate,
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to load dashboard stats" });
//     }
// };
exports.getDashboardStats = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const dateFilter =
            startDate && endDate
                ? {
                    createdAt: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate),
                    },
                }
                : {};

        const totalOrders = await Order.countDocuments(dateFilter);

        const revenueAgg = await Order.aggregate([
            {
                $match: {
                    ...dateFilter,
                    isPaid: true,
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalPrice" },
                },
            },
        ]);

        const totalRevenue = revenueAgg[0]?.total || 0;

        const pendingPayments = await Order.countDocuments({
            ...dateFilter,
            isPaid: false,
        });

        const deliveredOrders = await Order.countDocuments({
            ...dateFilter,
            isDelivered: true,
        });

        // 📈 Revenue by date
        const revenueByDate = await Order.aggregate([
            {
                $match: {
                    ...dateFilter,
                    isPaid: true,
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                    },
                    revenue: { $sum: "$totalPrice" },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        res.json({
            totalOrders,
            totalRevenue,
            pendingPayments,
            deliveredOrders,
            revenueByDate,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to load dashboard stats" });
    }
};




