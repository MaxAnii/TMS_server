const express = require("express");
const app = express();
const router = require("./routes/mainRoutes");
const cors = require("cors");
const getTimestamp = require("./libs/timeStamp");
const port = process.env.PORT;
app.use(express.json());
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type"],
	})
);

app.use("/", router);
console.log(getTimestamp());
app.get("/", (req, res) => {
	res.send("i'm live");
});
app.listen(port, () => {
	console.log(`server is live at ${port}`);
});

module.exports = app;
