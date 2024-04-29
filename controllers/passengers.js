const pool = require("../config/db");
const insertPassengerData = async (req, res) => {
	try {
		const { device_id, on_board_time, user_type } = req.body;
		console.log(req.body);
		const data = await pool.query(
			`INSERT INTO tripInformation VALUES($1,$2,$3) RETURNING *`,
			[device_id, on_board_time, user_type]
		);
		if (data.rows.length) {
			res.status(200).send("success");
		} else {
			res.status(500).send("failure");
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
};

module.exports = insertPassengerData;
