const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const { generateToken, getTokenInformation } = require("../libs/resetToken");

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const data = await pool.query(`SELECT * FROM users WHERE "email"=$1`, [
			email,
		]);
		if (!data.rows.length) {
			res.status(401).json({ message: "Email not found." });
		}
		const hashedPassword = data.rows[0].password;
		const passwordMatches = await bcrypt.compare(password, hashedPassword);
		if (!passwordMatches) {
			res.status(401).json({ message: "Incorrect password." });
		}
		res.status(200).json({ message: "Success." });
	} catch (error) {
		console.log(error.message);
	}
};

const sendPasswordResetLink = async (req, res) => {
	try {
		const { email } = req.params;
		const data = await pool.query(`SELECT * FROM users WHERE "email"=$1`, [
			email,
		]);
		if (!data.rowCount) {
			res.status(401).json({ message: "Email not found." });
		} else {
			await generateToken(email);
			res.status(200).json({ message: "Reset link sent." });
		}
	} catch (error) {
		console.log(error.message);
	}
};

const verifyResetToken = async (req, res) => {
	try {
		const { token } = req.params;
		const data = await getTokenInformation(token);
		if (!data) {
			res.status(404).json({ message: "Token not found." });
		}
		const tokenExpireTime = data.expiretime;
		const hasExpired = new Date(tokenExpireTime) < new Date();
		if (hasExpired) {
			res.status(400).json({ message: "Token is expired." });
		}
		res.status(200).json({ message: "Token verified" });
	} catch (error) {}
};

const createNewPassword = async (req, res) => {
	try {
		const { password, token } = req.body;

		const tokenData = await getTokenInformation(token);
		if (!tokenData) {
			res.status(404).json({ message: "Token not found." });
			return;
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const email = tokenData.email;
		const data = await pool.query(
			`UPDATE users SET "password" = $1 WHERE "email"=$2 RETURNING *`,
			[hashedPassword, email]
		);
		console.log("test", data.rowCount);
		if (!data.rows.length) {
			res.status(404).json({ message: "Database error." });
			return;
		}
		res.status(200).json({ message: "Password updated." });
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = {
	login,
	sendPasswordResetLink,
	verifyResetToken,
	createNewPassword,
};
