const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

// Register admin (run once)
exports.registerAdmin = async (req, res) => {
    const { email, password } = req.body;

    const adminExists = await Admin.findOne({ email });
    if (adminExists)
        return res.status(400).json({ message: "Admin already exists" });

    const admin = await Admin.create({ email, password });

    res.json({
        _id: admin._id,
        email: admin.email,
        token: generateToken(admin._id),
    });
};

// Login admin
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (admin && (await admin.matchPassword(password))) {
        res.json({
            _id: admin._id,
            email: admin.email,
            token: generateToken(admin._id),
        });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
};
