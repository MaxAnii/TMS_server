const pool = require("../config/db");
const getData = async (req, res) => {
	try {
		const { startingTimeStamp, endingTimeStamp } = req.body;
		const data = await pool.query(
			`SELECT * FROM timeStampData WHERE devicetime BETWEEN $1 AND $2`,
			[startingTimeStamp, endingTimeStamp]
		);
		if (data.rows.length) {
			res.json({
				data: data.rows,
			});
		} else {
			res.json({
				message: "No data found",
			});
		}
	} catch (error) {
		res.status(400).send("bad request");
	}
};

module.exports = getData;
