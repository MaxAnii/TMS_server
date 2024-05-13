const {
	insertDeviceStatus,
	updateDeviceStatus,
	getStatus,
	addDevice,
	getDeviceList,
	updateDeviceDetails,
} = require("../controllers/deviceInfo");

const deviceRouter = require("express").Router();
deviceRouter.post("/add", addDevice);
deviceRouter.get("/list", getDeviceList);
deviceRouter.post("/set-status", insertDeviceStatus);
deviceRouter.post("/update-status", updateDeviceStatus);
deviceRouter.get("/get-status", getStatus);
deviceRouter.put("/update-details", updateDeviceDetails);
module.exports = deviceRouter;
