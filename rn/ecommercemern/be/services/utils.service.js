const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL,
});

const db = require("../dbConnect/neon/Postgres");

class UtilsService {
    upload = async (user, file) => {
        return db.transaction(async (db) => {
            const resultUpload = await imagekit.upload({
                file: file.buffer,
                fileName: file.originalname,
            });

            const userUploadCreated = await db.query(
                `
                    INSERT INTO user_uploads (id, userid, image_id, imagename, imageurl, imagethumbnailurl, deleted, createdAt, updatedAt) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                    RETURNING *
                `,
                [
                    new Date().getTime(),
                    user.id,
                    resultUpload.fileId,
                    resultUpload.name,
                    resultUpload.url,
                    resultUpload.thumbnailUrl,
                    "no",
                    new Date().toLocaleString("vi-VN", {
                        timeZone: "Asia/Ho_Chi_Minh",
                    }),
                    new Date().toLocaleString("vi-VN", {
                        timeZone: "Asia/Ho_Chi_Minh",
                    }),
                ]
            );

            return {
                id: userUploadCreated.rows[0].id,
                username: user.username,
                resultUpload,
            };
        });
    };

    delete = async (imageId) => {
        return db.transaction(async (db) => {
            const userUploadDeleted = await db.query(
                `
                    DELETE FROM user_uploads 
                    WHERE image_id = $1
                `,
                [imageId]
            );

            const imageDeleted = await imagekit.deleteFile(imageId);

            return {
                imageDeleted,
                userUploadDeleted,
            };
        });
    };
}

module.exports = UtilsService;
