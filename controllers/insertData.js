const pool = require("../config/db");
const getTimestamp = require("../libs/timeStamp");
const insertData = async (req, res) => {
	try {
		const { id, field1, field2 } = req.body;
		const timestamp = getTimestamp();
		const data = await pool.query(
			`INSERT INTO timeStampData VALUES($1,$2,$3,$4) RETURNING *`,
			[id, timestamp, field1, field2]
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
