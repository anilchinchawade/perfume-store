const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        brand: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        category: {
            type: String,
            enum: ["Men", "Women", "Unisex"],
            required: true,
        },

        volume: {
            type: Number, // in ml
            required: true,
        },

        image: {
            type: String, // image URL
            required: true,
        },

        stock: {
            type: Number,
            default: 0,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // adds createdAt & updatedAt
    }
);

module.exports = mongoose.model("Product", productSchema);
