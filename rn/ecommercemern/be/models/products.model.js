class Product {
    constructor(
        title,
        description,
        image,
        categories,
        size,
        color,
        price,
        createdAt = new Date().toLocaleString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
        }),
        updatedAt = new Date().toLocaleString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
        })
    ) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.categories = categories;
        this.size = size;
        this.color = color;
        this.price = price;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = Product;
