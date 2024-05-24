const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const { generateToken, getTokenInformation } = require("../libs/resetToken");

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const data = await pool.query(`SELECT * FROM users WHERE email = $1`, [
			email,
		]);

		if (!data.rowCount) {
			return res.status(401).json({ message: "Email not found." });
		}

		const user = data.rows[0];
		const passwordMatches = await bcrypt.compare(password, user.password);

		if (!passwordMatches) {
			return res.status(401).json({ message: "Incorrect password." });
		}

		res.cookie(
			"user",
			{ id: user.id, role: user.role, email: user.email },
			{
				httpOnly: true,
				sameSite: "strict",
				secure: false, // Set this to true in production with HTTPS
			}
		);

		return res.status(200).json({ message: "Login successful" });
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({ message: "Internal server error" });
	}
};

const getCookie = async (req, res) => {
	const user = req.cookies.user;
	console.log(user);
	if (user) {
		return res.status(200).json(user);
	} else {
		return res.status(401).json({ message: "No user cookie found" });
	}
};
const logout = async (req, res) => {
	try {
		res.cookie("user", "", {
			expires: new Date(Date.now() + 5 * 1000),
			httpOnly: true,
		});
		res
			.status(200)
			.json({ success: true, message: "User logged out successfully" });
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
			return res.status(401).json({ message: "Email not found." });
		}
		await generateToken(email);
		return res.status(200).json({ message: "Reset link sent." });
	} catch (error) {
		console.log(error.message);
	}
};

const verifyResetToken = async (req, res) => {
	try {
		const { token } = req.params;
		const data = await getTokenInformation(token);
		if (!data) {
			return res.status(404).json({ message: "Token not found." });
		}
		const tokenExpireTime = data.expiretime;
		const hasExpired = new Date(tokenExpireTime) < new Date();
		if (hasExpired) {
			return res.status(400).json({ message: "Token is expired." });
		}
		res.status(200).json({ message: "Token verified" });
	} catch (error) {
		console.log(error.message);
	}
};

const createNewPassword = async (req, res) => {
	try {
		const { password, token } = req.body;

		const tokenData = await getTokenInformation(token);
		if (!tokenData) {
			return res.status(404).json({ message: "Token not found." });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const email = tokenData.email;
		const data = await pool.query(
			`UPDATE users SET "password" = $1 WHERE "email"=$2 RETURNING *`,
			[hashedPassword, email]
		);
		if (!data.rows.length) {
			return res.status(404).json({ message: "Database error." });
		}
		res.status(200).json({ message: "Password updated." });
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = {
	login,
	logout,
	sendPasswordResetLink,
	verifyResetToken,
	createNewPassword,
	getCookie,
};
