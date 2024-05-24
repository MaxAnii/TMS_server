const express = require("express");
const app = express();
const router = require("./routes/mainRoutes");
const cors = require("cors");
const getTimestamp = require("./libs/timeStamp");
const cookieParser = require("cookie-parser");
const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:5173",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type"],
		credentials: true,
	})
);

app.use("/", router);

app.get("/", (req, res) => {
	res.send("i'm live");
});
app.listen(port, () => {
	console.log(`server is live at ${port}`);
});

module.exports = app;
