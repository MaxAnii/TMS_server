const { insertTripDetail, getTripDetails } = require("../controllers/tripInfo");

const tripRouter = require("express").Router();

tripRouter.post("/", insertTripDetail);
tripRouter.get("/:date", getTripDetails);
module.exports = tripRouter;
