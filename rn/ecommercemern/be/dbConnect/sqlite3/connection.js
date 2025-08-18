const Database = require("better-sqlite3");
const { excuteQuerySQLCreateTables, querySQLData } = require("./querySQL");

const db = new Database("pxh2910.db3");

db.pragma("journal_mode = WAL");

const main = async () => {
    try {
        excuteQuerySQLCreateTables(db);

        // Add data test
        // Insert
        const insertUsersStmt = await db.prepare(
            querySQLData.create.table.users
        );
        const idUser = new Date().getTime();
        await insertUsersStmt.run(
            idUser,
            `admin${idUser}`,
            `admin@${idUser}.com`,
            "123456",
            "Admin",
            new Date().toLocaleString("vi-VN", {
                timeZone: "Asia/Ho_Chi_Minh",
            }),
            new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
        );
        console.log("Inserted data to users OK");

        const insertProductsStmt = await db.prepare(
            querySQLData.create.table.products
        );
        const idProduct = new Date().getTime();
        await insertProductsStmt.run(
            idProduct,
            "Nubia A76 4GB 128GB (NFC)",
            "Nubia A76 NFC được định vị là sản phẩm hướng đến nhóm người dùng phổ thông, đặc biệt là những ai tìm kiếm một chiếc điện thoại kết hợp hoàn hảo giữa thiết kế phong cách flagship, camera AI 50MP chuyên nghiệp và trải nghiệm Android 15 với Google Gemini tích hợp.",
            "https://cdn2.fptshop.com.vn/unsafe/384x0/filters:format(webp):quality(75)/nubia_a76_xam_5_87aade2a96.jpg",
            "Điện thoại",
            "128",
            "Xám",
            "2.290.000",
            new Date().toLocaleString("vi-VN", {
                timeZone: "Asia/Ho_Chi_Minh",
            }),
            new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
        );
        console.log("Inserted data to products OK");

        const insertOrdersStmt = await db.prepare(
            querySQLData.create.table.orders
        );
        const idOrder = new Date().getTime();
        await insertOrdersStmt.run(
            idOrder,
            idUser,
            idProduct,
            "1",
            "2.290.000",
            "Sài Gòn",
            "Đang xử lý"
        );
        console.log("Inserted data to orders OK");

        const insertCartsStmt = await db.prepare(
            querySQLData.create.table.carts
        );
        const idCart = new Date().getTime();
        await insertCartsStmt.run(idCart, idUser, idProduct, "10");
        console.log("Inserted data to carts OK");
    } catch (error) {
        console.log(error);
    }
};

main();

module.exports = db;
