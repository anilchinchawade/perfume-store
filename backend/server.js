const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

// const Product = require("./models/Product");
const productRoutes = require("./routes/productRoutes");

const uploadRoutes = require("./routes/uploadRoutes");

const authRoutes = require("./routes/authRoutes");

const orderRoutes = require("./routes/orderRoutes");

// app.use(cors());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// Routes
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    tls: true,
    tlsAllowInvalidCertificates: true,
})
    .then(() => console.log("MongoDB connected ✅"))
    .catch(err => console.error("MongoDB error ❌", err));

app.get("/", (req, res) => {
    res.send("Backend & MongoDB connected 🚀");
});

// app.get("/test-product", async (req, res) => {
//     const product = await Product.create({
//         name: "Ocean Breeze",
//         brand: "AromaLux",
//         description: "Fresh ocean-inspired fragrance",
//         price: 1999,
//         category: "Unisex",
//         volume: 100,
//         image: "https://example.com/perfume.jpg",
//         stock: 50,
//     });

//     res.json(product);
// });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);
