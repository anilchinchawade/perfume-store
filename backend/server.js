const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// const Product = require("./models/Product");


app.use(cors());
app.use(express.json());

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
