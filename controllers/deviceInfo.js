const pool = require("../config/db");

const insertDeviceStatus = async (req, res) => {
	try {
		const { device_id, status } = req.body;
		const data = await pool.query(
			`INSERT INTO device_status VALUES($1,$2) RETURNING *`,
			[device_id, status]
		);
		if (data.rows.length) {
			res.status(200).send("success");
		} else {
			res.status(404).send("something went wrong!!");
		}
	} catch (error) {
		res.send(400).send(error.message);
	}
};
const updateDeviceStatus = async (req, res) => {
	try {
		const { device_id, status } = req.body;
		const data = await pool.query(
			`UPDATE device_status SET "status"=$1 WHERE "device_id"=$2 RETURNING *`,
			[status, device_id]
		);
		if (data.rows.length) {
			res.status(200).send("success");
		} else {
			res.status(404).send("something went wrong!!");
		}
	} catch (error) {
		res.send(400).send(error.message);
	}
};

const getStatus = async (req, res) => {
	try {
		const data = await pool.query("SELECT * FROM device_status");
		if (data.rows.length) {
			res.status(200).json(data.rows);
		} else {
			res.status(404).send("something went wrong!!");
		}
	} catch (error) {
		res.send(400).send(error.message);
	}
};

module.exports = { insertDeviceStatus, updateDeviceStatus, getStatus };
