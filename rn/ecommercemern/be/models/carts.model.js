class Cart {
    constructor(
        userId,
        productId,
        quantity,
        createdAt = new Date().toLocaleString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
        }),
        updatedAt = new Date().toLocaleString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
        })
    ) {
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = Cart;
