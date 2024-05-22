const transporter = require("../config/nodeMailer");
const { resetLinkEmailTemplate } = require("./emailTemplate");
const sendPasswordResetMail = async (email, token) => {
	console.log(email, token);
	const confrimLink = `http://localhost:3000/emailverification?token=${token}`;
	await transporter.sendMail({
		from: process.env.TRANSPORTER_FROM,
		to: email,
		subject: "Verify your email.",
		html: resetLinkEmailTemplate(confrimLink),
	});
};

module.exports = { sendPasswordResetMail };
