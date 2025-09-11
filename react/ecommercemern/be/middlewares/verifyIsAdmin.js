const verifyIsAdmin = (req, res, next) => {
    if (req.user.role !== "Admin") {
        return res
            .status(403)
            .json({ message: "Truy cập bị từ chối. Bạn không có quyền." });
    }
    next();
};

module.exports = verifyIsAdmin;
