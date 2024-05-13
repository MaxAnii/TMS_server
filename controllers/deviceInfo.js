const pool = require("../config/db");
const { v4: uuid } = require("uuid");
const addDevice = async (req, res) => {
	try {
		const { modelNumber, vehicleNumber, manufacturer, capcity } = req.body;
		const id = uuid();
		const data = await pool.query(
			`INSERT INTO device VALUES ($1,$2,$3,$4,$5) RETURNING *`,
			[id, modelNumber, vehicleNumber, manufacturer, capcity]
		);
		if (data.rows.length) {
			const statusData = await pool.query(
				`INSERT INTO device_status VALUES($1,$2) RETURNING *`,
				[modelNumber, "0"]
			);
			if (statusData.rows.length) {
				res.status(200).send("success");
			} else {
				const deleteDevice = await pool.query(
					`DELETE FROM device WHERE id=$1`,
					[id]
				);
				res.status(404).send("something went wrong!!");
			}
		} else {
			res.status(404).send("something went wrong!!");
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
};

const getDeviceList = async (req, res) => {
	try {
		const data = await pool.query("SELECT * FROM device");
		if (data.rows.length) {
			res.status(200).json(data.rows);
		} else {
			res.status(404).send("something went wrong!!");
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
};

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
		res.status(400).send(error.message);
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
		res.status(400).send(error.message);
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
		res.status(400).send(error.message);
	}
};

const updateDeviceDetails = async (req, res) => {
	try {
		const { id, modelNumber, vehicleNumber, manufacturer, capcity } = req.body;
		const data = await pool.query(
			`UPDATE device SET "modelnumber"=$1, "vehiclenumber"=$2, "manufacturer"=$3, "capcity"=$4 WHERE "id"=$5 RETURNING *`,
			[modelNumber, vehicleNumber, manufacturer, capcity, id]
		);

		if (data.rows.length) {
			res.status(200).send("success");
		} else {
			res.status(404).send("something went wrong!!");
		}
	} catch (error) {
		console.log(error.message);
		res.status(400).send(error.message);
	}
};

module.exports = {
	addDevice,
	insertDeviceStatus,
	updateDeviceStatus,
	getStatus,
	getDeviceList,
	updateDeviceDetails,
};
