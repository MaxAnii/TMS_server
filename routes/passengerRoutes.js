const insertPassengerData = require("../controllers/passengers");

const passengerRouter = require("express").Router();
passengerRouter.post("/", insertPassengerData);
module.exports = passengerRouter;
