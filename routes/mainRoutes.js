const router = require("express").Router();
const getData = require("../controllers/getData");
const insertData = require("../controllers/insertData");
router.get("/:startingTimeStamp/:endingTimeStamp", getData);
router.post("/", insertData);
module.exports = router;
