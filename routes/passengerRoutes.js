const {
	insertPassengerData,
	getComparisonData,
} = require("../controllers/passengers");

const passengerRouter = require("express").Router();
passengerRouter.post("/", insertPassengerData);
passengerRouter.get("/comparison/:date", getComparisonData);
module.exports = passengerRouter;
