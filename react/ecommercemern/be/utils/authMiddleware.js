const dotenv = require("dotenv");
dotenv.config({ path: ".env.local", override: true });

const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
        return res
            .status(401)
            .json({ message: "Truy cập bị từ chối. Thiếu token." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res
                .status(403)
                .json({ message: "Token không hợp lệ hoặc đã hết hạn." });
        }
        req.user = user; // Lưu thông tin user vào request
        next();
    });
};

module.exports = { authenticateToken };
