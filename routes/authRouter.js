const {
	login,
	sendPasswordResetLink,
	verifyResetToken,
	createNewPassword,
} = require("../controllers/auth");

const authRouter = require("express").Router();

authRouter.post("/login", login);
authRouter.get("/send-reset-link/:email", sendPasswordResetLink);
authRouter.get("/verfiy-reset-token/:token", verifyResetToken);
authRouter.post("/newpassword", createNewPassword);
module.exports = authRouter;
