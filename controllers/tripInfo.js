const pool = require("../config/db");
const getTripDetailsQuery = require("../Queries/getTripDetails");
const insertTripDetail = async (req, res) => {
	try {
		const { id, start_time, end_time } = req.body;

		const data = await pool.query(
			"INSERT INTO tripSchedule VALUES ($1,$2,$3) RETURNING *",
			[id, start_time, end_time]
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

const getTripDetails = async (req, res) => {
	try {
		const query = getTripDetailsQuery(date);
		const data = await pool.query(query);
		res.json(data.rows);
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = { insertTripDetail, getTripDetails };
