const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL,
});

const db = require("../dbConnect/neon/Postgres");

const axios = require("axios");

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

    momo = async (data) => {
        return db.transaction(async (db) => {
            //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
            //parameters
            var partnerCode = "MOMO";
            var accessKey = "F8BBA842ECF85";
            var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
            var requestId = partnerCode + new Date().getTime();
            var orderId = requestId;
            var orderInfo = "Thanh Toán MoMo";
            var redirectUrl = "https://momo.vn/return";
            var ipnUrl = "https://callback.url/notify";
            // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
            var amount = data.amount;
            var requestType = "captureWallet";
            var extraData = ""; //pass empty value if your merchant does not have stores

            //before sign HMAC SHA256 with format
            //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
            var rawSignature =
                "accessKey=" +
                accessKey +
                "&amount=" +
                amount +
                "&extraData=" +
                extraData +
                "&ipnUrl=" +
                ipnUrl +
                "&orderId=" +
                orderId +
                "&orderInfo=" +
                orderInfo +
                "&partnerCode=" +
                partnerCode +
                "&redirectUrl=" +
                redirectUrl +
                "&requestId=" +
                requestId +
                "&requestType=" +
                requestType;
            //puts raw signature
            console.log("--------------------RAW SIGNATURE----------------");
            console.log(rawSignature);
            //signature
            const crypto = require("crypto");
            var signature = crypto
                .createHmac("sha256", secretkey)
                .update(rawSignature)
                .digest("hex");
            console.log("--------------------SIGNATURE----------------");
            console.log(signature);

            //json object send to MoMo endpoint
            const requestBody = JSON.stringify({
                partnerCode: partnerCode,
                accessKey: accessKey,
                requestId: requestId,
                amount: amount,
                orderId: orderId,
                orderInfo: orderInfo,
                redirectUrl: redirectUrl,
                ipnUrl: ipnUrl,
                extraData: extraData,
                requestType: requestType,
                signature: signature,
                lang: "en",
            });

            const res = await axios.post(
                "https://test-payment.momo.vn/v2/gateway/api/create",
                requestBody,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            return res.data.payUrl;
        });
    };
}

module.exports = UtilsService;
