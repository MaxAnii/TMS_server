const router = require("express").Router();
const getData = require("../controllers/getData");
const passengerRouter = require("./passengerRoutes");
const tripRouter = require("./tripRouter");

// routes

router.use("/   ", passengerRouter);
router.use("/trip", tripRouter);

router.get("/:startingTimeStamp/:endingTimeStamp", getData);

module.exports = router;
