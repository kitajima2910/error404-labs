const AuthsService = require("../services/auths.service");

class Auth {
    constructor(app) {
        this.app = app;
    }

    login = () => {
        this.app.post("/auths/login", async (req, res) => {
            try {
                const data = req.body;

                const authsService = new AuthsService();
                const resultAuth = await authsService.login(data);

                if (!resultAuth) {
                    return res.status(400).send({
                        message: "Invalid username or password",
                    });
                }

                res.status(200).send({
                    message: "Login successfully",
                    resultAuth,
                });
            } catch (error) {
                res.status(500).send(error);
            }
        });
    };

    run = () => {
        this.login();
    };
}

module.exports = Auth;
