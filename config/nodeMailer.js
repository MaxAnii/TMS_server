
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: "SendinBlue",
	auth: {
		user: process.env.NODEMAILER_AUTH_USER,
		pass: process.env.NODEMAILER_AUTH_PASS,
	},
});

module.exports = transporter;
