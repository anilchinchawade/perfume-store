const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                name: String,
                price: Number,
                qty: Number,
                image: String,
            },
        ],

        shippingAddress: {
            fullName: String,
            address: String,
            city: String,
            pincode: String,
            phone: String,
        },

        totalPrice: {
            type: Number,
            required: true,
        },

        isPaid: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
