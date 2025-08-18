class Order {
    constructor(
        userId,
        productId,
        quantity,
        amount,
        address,
        status,
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
        this.amount = amount;
        this.address = address;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = Order;
