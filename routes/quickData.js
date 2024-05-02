const { getQuickData } = require("../controllers/getData");

const quickDataRouter = require("express").Router();

quickDataRouter.get("/:date", getQuickData);

module.exports = quickDataRouter;
