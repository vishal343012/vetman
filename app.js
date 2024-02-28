const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const rfs = require("rotating-file-stream");

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

// require("express-async-errors");

const app = express();

// Config
dotenv.config();
const allowedOrigins = [
	"http://localhost:5173",
	"http://localhost:4000",
	"https://vetmedman.com",
	"https://www.vetmedman.com",
	"https://vetmedman.azurewebsites.net",
	"https://vetmedman.onrender.com",
	"https://vetmedman-webapp-prod.azurewebsites.net",
	"https://vetmedman-webapp.azurewebsites.net",
];

const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	optionsSuccessStatus: 204,
	credentials: true, // Allow credentials like cookies
};
app.use(cors(corsOptions)); //for dev
// app.use(cors());	//for production

app.use(cookieParser());
app.use(express.json());

// log all requests to access.log
//create folder if not exist
if (!fs.existsSync("./log")) {
	fs.mkdirSync("./log");
}
const pad = (num) => (num > 9 ? "" : "0") + num;
const generator = (time, index) => {
	if (!time) return "file.log";

	var month = time.getFullYear() + "" + pad(time.getMonth() + 1);
	var day = pad(time.getDate());
	var hour = pad(time.getHours());
	var minute = pad(time.getMinutes());

	return `${month}/${month}${day}-${hour}${minute}-${index}-file.log`;
};
const accessLogStream = rfs.createStream(generator, {
	size: "10M",
	interval: "1d",
	path: "./log",
	maxFiles: 40,
});
app.use(
	morgan("common", {
		stream: accessLogStream,
	})
);

//Route Imports
const apiRoute = require("./routes/apiRoute");
const helmet = require("helmet");
const cspConfig = {
	directives: {
		"img-src": ["'self'", "imgur.com"],
	},
};

// Use helmet with CSP middleware
// app.use(helmet.contentSecurityPolicy(cspConfig));
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// app.use(helmet()); //set security HTTP headers
app.use(xss()); //prevent XSS attacks
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000, //15 minutes
		max: 5000, //limit each IP to 100 requests per windowMs
	})
);

app.use("/", express.static("./Frontend/build"));
app.use("/assests", express.static("./Frontend/build/assests"));

app.use("/api/v1", apiRoute);

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "./Frontend/build/index.html"), (err) => {
		if (err) {
			console.error("Error sending file:", err);
		}
	});
});
// app.use(require("./middleware/error-handler"));

//Middleware for error
app.use(globalErrorHandler);

module.exports = app;
