const {
	insertDeviceStatus,
	updateDeviceStatus,
	getStatus,
} = require("../controllers/deviceInfo");

const deviceRouter = require("express").Router();

deviceRouter.post("/set-status", insertDeviceStatus);
deviceRouter.post("/update-status", updateDeviceStatus);
deviceRouter.get("/get-status", getStatus);

module.exports = deviceRouter;
