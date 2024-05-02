const pool = require("../config/db");
const getQuickData = async (req, res) => {
	try {
		const { date } = req.params;
		console.log(req.params);
		const data = await pool.query(
			`SELECT 
			COALESCE(SUM(CASE WHEN user_type = '1' THEN 1 ELSE 0 END), 0) AS employees,
			COALESCE(SUM(CASE WHEN user_type = '0' THEN 1 ELSE 0 END), 0) AS non_employees,
			COUNT(DISTINCT device_id) AS total_devices
		FROM 
			tripInformation
		WHERE on_board_time::date = $1`,
			[date]
		);

		if (data.rows.length) {
			res.status(200).json({
				totalEmployees: data.rows[0].employees,
				totalNonEmployees: data.rows[0].non_employees,
				totalDevice: data.rows[0].total_devices,
			});
		} else {
			res.status(404).send("No data found");
		}
	} catch (error) {
		console.log(error.message);
		res.status(400).send(error.message);
	}
};

module.exports = { getQuickData };
