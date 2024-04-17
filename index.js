const express = require("express");
const app = express();
const router = require("./routes/mainRoutes");
app.use(express.json());

app.use("/data", router);

app.listen(3000, () => {
	console.log("server is up");
});
