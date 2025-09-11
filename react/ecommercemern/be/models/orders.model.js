class Order {
    constructor(userId, productId, quantity, amount, address, status, deleted) {
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.amount = amount;
        this.address = address;
        this.status = status;
        this.deleted = deleted;
    }
}

module.exports = Order;
