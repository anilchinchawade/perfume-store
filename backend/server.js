const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

const productRoutes = require("./routes/productRoutes");

const uploadRoutes = require("./routes/uploadRoutes");

const authRoutes = require("./routes/authRoutes");

const orderRoutes = require("./routes/orderRoutes");

// CORS configuration
const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (Postman, mobile apps)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        },
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);
