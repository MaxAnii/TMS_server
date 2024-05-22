const router = require("express").Router();
const { getQuickData } = require("../controllers/getData");

const deviceRouter = require("./deviceRoutes");
const passengerRouter = require("./passengerRoutes");
const quickDataRouter = require("./quickData");
const tripRouter = require("./tripRouter");
const authRouter = require("./authRouter");
// routes

router.use("/auth", authRouter);
router.use("/quick-data", quickDataRouter);
router.use("/passenger", passengerRouter);
router.use("/trip", tripRouter);
router.use("/device", deviceRouter);

module.exports = router;
