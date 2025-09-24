import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const JWT_SECRET = process.env.JWT_ + process.env.SECRET_;
    const NODE_ENV = process.env.NODE_ + process.env.ENV_;

    const _token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "7d",
    });
    res.cookie("jwt", _token, {
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        secure: NODE_ENV !== "development",
        sameSite: "strict", // CSRF attacks cross-site request forgery
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    });

    return _token;
};
