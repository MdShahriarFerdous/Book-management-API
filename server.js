const { readdirSync } = require("fs");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

//middlewares
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//mongoose connection
mongoose.set("strictQuery", false);

mongoose
	.connect(process.env.MONGOOSE_DB_CONNECT)
	.then(() => {
		console.log("MongoDB connected!!");
	})
	.catch((err) => {
		console.log("Failed to connect to MongoDB", err.message);
	});

//localhost:3000/api/v1/r
readdirSync("./routes").map((r) =>
	app.use("/api/v1", require(`./routes/${r}`))
);

//unknown route
app.use("*", (req, res) => {
	res.status(404).json({
		message: "Server Not Found!",
	});
});

//PORT listening and created server
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server Running on port ${port}`);
});
