class Cart {
    constructor(userId, productId, quantity, deleted) {
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deleted = deleted;
    }
}

module.exports = Cart;
