class Order {
    constructor(userId, productId, quantity, amount, address, status) {
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.amount = amount;
        this.address = address;
        this.status = status;
    }
}

module.exports = Order;
