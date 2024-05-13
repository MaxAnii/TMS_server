const router = require("express").Router();
const { getQuickData } = require("../controllers/getData");

const deviceRouter = require("./deviceRoutes");
const passengerRouter = require("./passengerRoutes");
const quickDataRouter = require("./quickData");
const tripRouter = require("./tripRouter");

// routes

router.use("/passenger", passengerRouter);
router.use("/trip", tripRouter);
router.use("/device", deviceRouter);

router.use("/quick-data", quickDataRouter);

module.exports = router;
