const {
	login,
	sendPasswordResetLink,
	verifyResetToken,
	createNewPassword,
	getCookie,
	logout,
} = require("../controllers/auth");

const authRouter = require("express").Router();

authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/check-cookie", getCookie);
authRouter.get("/send-reset-link/:email", sendPasswordResetLink);
authRouter.get("/verfiy-reset-token/:token", verifyResetToken);
authRouter.post("/newpassword", createNewPassword);
module.exports = authRouter;
