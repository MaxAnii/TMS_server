const express = require("express");
const app = express();
const router = require("./routes/mainRoutes");
const cors = require("cors");
app.use(express.json());
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST"],
		allowedHeaders: ["Content-Type"],
	})
);

app.use("/data", router);

app.listen(3000, () => {
	console.log("server is up");
});
