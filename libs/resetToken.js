const { sendPasswordResetMail } = require("./sendEmail");
const getTimestamp = require("./timeStamp");

const pool = require("../config/db");
const { v4: uuid } = require("uuid");

const deletePerviousToken = async (email) => {
	try {
		const data = await pool.query(
			`SELECT * FROM resetToken WHERE "email" = $1`,
			[email]
		);
		if (data.rowCount) {
			await pool.query(`DELETE FROM resetToken WHERE "email" = $1`, [email]);
		}
	} catch (error) {
		console.log(error.message);
	}
};

const generateToken = async (email) => {
	try {
		const token = uuid();
		const expires = new Date(new Date().getTime() + 3600 * 1000);
		await deletePerviousToken(email);
		const data = await pool.query(`INSERT INTO resetToken VALUES($1,$2,$3)`, [
			token,
			email,
			expires,
		]);
		await sendPasswordResetMail(email, token);
	} catch (error) {
		console.log(error.message);
	}
};

const getTokenInformation = async (token) => {
	try {
		const data = await pool.query(`SELECT * FROM resetToken WHERE id=$1`, [
			token,
		]);
		if (data.rowCount) {
			return data.rows[0];
		}
		return null;
	} catch (error) {}
};

module.exports = { generateToken, getTokenInformation };
