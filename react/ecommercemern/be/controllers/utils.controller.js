const multer = require("multer");
const UtilsService = require("../services/utils.service");
const verifyToken = require("../middlewares/verifyToken");

const upload = multer();

class UtilsController {
    constructor(app) {
        this.app = app;
    }

    upload = () => {
        this.app.post(
            "/utils/upload",
            verifyToken,
            upload.single("file"),
            async (req, res) => {
                try {
                    const file = req.file;
                    const user = req.user;

                    if (!file) {
                        return res
                            .status(400)
                            .json({ error: "No file uploaded" });
                    }

                    const utilsService = new UtilsService();
                    const resultUpload = await utilsService.upload(user, file);

                    if (!resultUpload) {
                        return res.status(400).json({ error: "Upload failed" });
                    }

                    res.status(200).send({
                        message: "Upload successfully",
                        resultUpload,
                    });
                } catch (error) {
                    res.status(500).send(error);
                }
            }
        );
    };

    delete = () => {
        this.app.delete(
            "/utils/delete/:imageId",
            verifyToken,
            async (req, res) => {
                try {
                    console.log(req.params);
                    const imageId = req.params.imageId;
                    const utilsService = new UtilsService();
                    const result = await utilsService.delete(imageId);
                    res.status(200).send({
                        message: "Delete successfully",
                        result,
                    });
                } catch (error) {
                    res.status(500).send(error);
                }
            }
        );
    };

    paymentMoMo = () => {
        this.app.post("/utils/payment/MoMo", async (req, res) => {
            try {
                const utilsService = new UtilsService();
                const result = await utilsService.momo(req.body);

                res.status(200).send({
                    message: "Payment successfully",
                    result,
                });
            } catch (error) {
                res.status(500).send(error);
            }
        });
    };

    run = () => {
        this.upload();
        this.delete();
        this.paymentMoMo();
    };
}

module.exports = UtilsController;
