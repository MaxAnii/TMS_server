const express = require("express");
const app = express();
const router = require("./routes/mainRoutes");
const cors = require("cors");
const port = process.env.PORT;
app.use(express.json());
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST"],
		allowedHeaders: ["Content-Type"],
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
