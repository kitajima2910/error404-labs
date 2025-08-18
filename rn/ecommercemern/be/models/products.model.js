class Product {
    constructor(
        title,
        description,
        image,
        categories,
        size,
        color,
        price,
        deleted
    ) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.categories = categories;
        this.size = size;
        this.color = color;
        this.price = price;
        this.deleted = deleted;
    }
}

module.exports = Product;
