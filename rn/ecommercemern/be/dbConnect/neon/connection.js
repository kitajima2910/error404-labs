const dotenv = require("dotenv");
dotenv.config({ path: ".env.local", override: true });

const { querySQLCreateTables, querySQLDataTables } = require("./querySQL");

const { Client } = require("pg");

console.log("connectionString: ", process.env.DATABASE_URL_NEON);

const client = new Client({
    connectionString: process.env.DATABASE_URL_NEON,
});

const bcrypt = require("bcrypt");
const plaintextPassword = "pxh2910";
const saltRounds = 10;

const hashPassword = async (plaintextPassword) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plaintextPassword, salt);
    return hash.toString();
};

const createTablesAndDatabase = async () => {
    try {
        await client.connect();
        await client.query(querySQLCreateTables.users.create);
        await client.query(querySQLCreateTables.products.create);
        await client.query(querySQLCreateTables.orders.create);
        await client.query(querySQLCreateTables.carts.create);
        console.log("✅ Đã tạo các bảng thành công.");

        await createDatas();
        console.log("✅ Đã tạo dữ liệu cho bảng.");
    } catch (error) {
        console.error("❌ Lỗi khi tạo bảng:", error.message);
    } finally {
        await client.end();
    }
};

const createDatas = async () => {
    // ########################## START - CREATE USERS ##########################
    try {
        await client.query("BEGIN");
        var usersID01 = new Date().getTime() + 1;
        var usersID02 = new Date().getTime() + 2;
        var usersID03 = new Date().getTime() + 3;

        const usersData = [
            {
                id: usersID01,
                username: `admin-${usersID01}`,
                email: `admin-${usersID01}@gmail.com`,
                password: await hashPassword("123456"),
                role: "Admin",
                createdAt: new Date().toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                }),
                updatedAt: new Date().toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                }),
            },
            {
                id: usersID02,
                username: `admin-${usersID02}`,
                email: `admin-${usersID02}@gmail.com`,
                password: await hashPassword("123456"),
                role: "Admin",
                createdAt: new Date().toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                }),
                updatedAt: new Date().toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                }),
            },
            {
                id: usersID03,
                username: `admin-${usersID03}`,
                email: `admin-${usersID03}@gmail.com`,
                password: await hashPassword("123456"),
                role: "Admin",
                createdAt: new Date().toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                }),
                updatedAt: new Date().toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                }),
            },
        ];

        for (const user of usersData) {
            await client.query(querySQLDataTables.create.table.users(), [
                user.id,
                user.username,
                user.email,
                user.password,
                user.role,
                user.createdAt,
                user.updatedAt,
            ]);
        }
        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("❌ Lỗi khi tạo dữ liệu users:", error.message);
    }
    // ########################## END - CREATE USERS ##########################

    // ########################## START - CREATE PRODUCTS ##########################
    try {
        await client.query("BEGIN");
        var productsID01 = new Date().getTime() + 1;

        const productsData = [
            {
                id: productsID01,
                title: "Nubia A76 4GB 128GB (NFC)",
                description:
                    "Nubia A76 4GB 128GB (NFC) - Đen, Nubia A76 4GB 128GB (NFC) - Trắng",
                image: "https://cdn2.fptshop.com.vn/unsafe/384x0/filters:format(webp):quality(75)/nubia_a76_xam_5_87aade2a96.jpg",
                categories: "Phone",
                size: "4GB",
                color: "Đen",
                price: "1000000",
                createdAt: new Date().toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                }),
                updatedAt: new Date().toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                }),
            },
        ];

        for (const product of productsData) {
            await client.query(querySQLDataTables.create.table.products(), [
                product.id,
                product.title,
                product.description,
                product.image,
                product.categories,
                product.size,
                product.color,
                product.price,
                product.createdAt,
                product.updatedAt,
            ]);
        }
        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("❌ Lỗi khi tạo dữ liệu products:", error.message);
    }
    // ########################## END - CREATE PRODUCTS ##########################

    // ########################## START - CREATE ORDERS ##########################
    try {
        await client.query("BEGIN");
        var ordersID01 = new Date().getTime() + 1;

        const ordersData = [
            {
                id: ordersID01,
                userId: usersID02,
                productId: productsID01,
                quantity: "1",
                amount: "1000000",
                address: "Sài Gòn",
                status: "Pending",
                createdAt: new Date().toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                }),
                updatedAt: new Date().toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                }),
            },
        ];

        for (const order of ordersData) {
            await client.query(querySQLDataTables.create.table.orders(), [
                order.id,
                order.userId,
                order.productId,
                order.quantity,
                order.amount,
                order.address,
                order.status,
                order.createdAt,
                order.updatedAt,
            ]);
        }
        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("❌ Lỗi khi tạo dữ liệu orders:", error.message);
    }
    // ########################## END - CREATE ORDERS ##########################

    // ########################## START - CREATE CARTS ##########################
    try {
        await client.query("BEGIN");
        var cartsID01 = new Date().getTime() + 1;

        const cartsData = [
            {
                id: cartsID01,
                userId: usersID02,
                productId: productsID01,
                quantity: "1",
                createdAt: new Date().toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                }),
                updatedAt: new Date().toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                }),
            },
        ];

        for (const cart of cartsData) {
            await client.query(querySQLDataTables.create.table.carts(), [
                cart.id,
                cart.userId,
                cart.productId,
                cart.quantity,
                cart.createdAt,
                cart.updatedAt,
            ]);
        }
        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("❌ Lỗi khi tạo dữ liệu carts:", error.message);
    }
    // ########################## END - CREATE CARTS ##########################
};

createTablesAndDatabase();
