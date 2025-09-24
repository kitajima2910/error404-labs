import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const _token = req.cookies.jwt;

        if (!_token) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const JWT_SECRET = process.env.JWT_ + process.env.SECRET_;
        const decoded = jwt.verify(_token, JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
