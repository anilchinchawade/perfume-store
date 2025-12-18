const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);
