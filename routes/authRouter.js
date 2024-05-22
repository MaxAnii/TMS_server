const { login, sendPasswordResetLink } = require("../controllers/auth");

const authRouter = require("express").Router();

authRouter.post("/login", login);
authRouter.get("/send-reset-link/:email", sendPasswordResetLink);

module.exports = authRouter;
