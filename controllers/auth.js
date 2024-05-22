const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../libs/generateResetToken");
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
		if (!data.rows.length) {
			res.status(401).json({ message: "Email not found." });
		} else {
			await generateToken(email);
			res.status(200).json({ message: "Reset link sent." });
		}
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = { login, sendPasswordResetLink };
