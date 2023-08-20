import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import xssClean from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

import blogRoute from "./resources/user/routes/blog.routes.js";
import userRoute from "./resources/user/routes/user.routes.js";

const app = express();

// XSS protection middleware
app.use(xssClean());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB query sanitizer middleware
app.use(mongoSanitize());

// Define rate limiter options
const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 5, // maximum of 5 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  keyGenerator: function (req, res) {
    // Generate a unique key using the user token (assuming it's stored in the request header)
    return req.headers.authorization || req.ip;
  },
});

app.get("/", (req, res) => {
  res.send("Welcome to ABC inc Blog App ");
});

// Apply rate limiter middleware to endpoints matching the prefix
app.use("/api/v1/*", limiter);

app.use('/api/v1/blog', blogRoute);
app.use('/api/v1/user', userRoute);

export default app;
