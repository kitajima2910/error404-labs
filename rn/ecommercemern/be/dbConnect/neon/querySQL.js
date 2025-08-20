const querySQLCreateTables = {
    users: {
        create: `create table if not exists users (
            id text primary key,
            username text,
            email text,
            password text,
            role text,
            deleted text,
            createdAt text,
            updatedAt text
        );`,
    },
    products: {
        create: `create table if not exists products (
            id text primary key,
            title text,
            description text,
            image text,
            categories text,
            size text,
            color text,
            price text,
            deleted text,
            createdAt text,
            updatedAt text
        );`,
    },
    orders: {
        create: `create table if not exists orders (
            id text primary key,
            userId text,
            productId text,
            quantity text,
            amount text,
            address text,
            status text,
            deleted text,
            createdAt text,
            updatedAt text
        );`,
    },
    carts: {
        create: `create table if not exists carts (
            id text primary key,
            userId text,
            productId text,
            quantity text,
            deleted text,
            createdAt text,
            updatedAt text
        );`,
    },
    user_uploads: {
        create: `create table if not exists user_uploads (
            id text primary key,
            userId text,
            image_id text,
            imageName text,
            imageUrl text,
            imageThumbnailUrl text,
            deleted text,
            createdAt text,
            updatedAt text
        );`,
    },
};

const querySQLDataTables = {
    create: {
        table: {
            users: () => `
                INSERT INTO users (id, username, email, password, role, deleted, createdAt, updatedAt) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
            `,
            products: () => `
                INSERT INTO products (id, title, description, image, categories, size, color, price, deleted, createdAt, updatedAt) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
            `,
            orders: () => `
                INSERT INTO orders (id, userId, productId, quantity, amount, address, status, deleted, createdAt, updatedAt) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
            `,
            carts: () => `
                INSERT INTO carts (id, userId, productId, quantity, deleted, createdAt, updatedAt) 
                VALUES ($1, $2, $3, $4, $5, $6, $7);
            `,
        },
    },
    read: {
        table: {},
    },
    update: {
        table: {},
    },
    delete: {
        table: {},
    },
};

module.exports = {
    querySQLCreateTables,
    querySQLDataTables,
};
