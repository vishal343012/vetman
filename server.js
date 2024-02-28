const app = require("./app");
const dotenv = require("dotenv");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
	logger.error(`Error: ${err.message}`);
	logger.info("Shutting down the server due to uncaught Exception");
	process.exit(1);
});

// Config
dotenv.config();

// Connecting to the database
mongoose.set("strictQuery", false);
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB connection successful!"));

const port = process.env.PORT;

const server = app.listen(port, () => {
	logger.info(`Server is running on http://localhost:${port}`);
});

// Unhandled promise rejection (e.g., if the MongoDB URL is incorrect)
// We want the server to crash in this case
process.on("unhandledRejection", (err) => {
	logger.error(`Error: ${err.message}`);
	logger.error(`Shutting down the server due to unhandled Promise rejection`);

	server.close(() => {
		process.exit(1);
	});
});
