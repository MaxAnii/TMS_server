const pool = require("../config/db");
const getTimestamp = require("../libs/timeStamp");
const insertData = async (req, res) => {
	try {
		const { device_id, user_type } = req.body;
		const on_board_time = getTimestamp();
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
		res.status(400).send("bad request");
	}
};

module.exports = insertData;
