const { sendPasswordResetMail } = require("./sendEmail");
const getTimestamp = require("./timeStamp");

const pool = require("../config/db");
const { v4: uuid } = require("uuid");

const DeletePerviousToken = async (email) => {
	try {
		console.log(email, "delete");
		const data = await pool.query(
			`SELECT * FROM resetToken WHERE "email" = $1`,
			[email]
		);
		if (data.rows.length) {
			await pool.query(`DELETE FROM resetToken WHERE "email" = $1`, [email]);
		}
	} catch (error) {
		console.log(error.message);
	}
};

const generateToken = async (email) => {
	try {
		const token = uuid();
		const timeStamp = getTimestamp();
		await DeletePerviousToken(email);
		const data = await pool.query(`INSERT INTO resetToken VALUES($1,$2,$3)`, [
			token,
			email,
			timeStamp,
		]);
		await sendPasswordResetMail(email, token);
	} catch (error) {
		console.log(error.message);
	}
};
module.exports = { generateToken };
