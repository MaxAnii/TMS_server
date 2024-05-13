const pool = require("../config/db");
const getComparisonDataQuery = require("../Queries/comparisonData");
const insertPassengerData = async (req, res) => {
	try {
		const { device_id, on_board_time, user_type } = req.body;
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

const getComparisonData = async (req, res) => {
	try {
		const { date } = req.params;
		const query = getComparisonDataQuery(date);
		const data = await pool.query(query);
		console.log(data.rows);
		if (data.rows.length) {
			res.status(200).json(data.rows);
		} else
			res.status(404).json({
				message: "No data found",
			});
	} catch (error) {
		res.status(400).send(error.message);
	}
};

module.exports = { insertPassengerData, getComparisonData };
