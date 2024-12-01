const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
const { connectTo } = require("./DB/connectTo");
const announcementsRouter = require("./routes/announcements_routes");
const userRouter = require("./routes/user_routes");
const dueRouter = require("./routes/due_routes");
const httpStatusText = require("./utils/HttpStatusText");

const port = process.env.PORT;

const DB_URI = process.env.URI;
connectTo(DB_URI);

const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/api/announcements", announcementsRouter);
app.use("/api/auth", userRouter);
app.use("/api/dues", dueRouter);

// Global middleware for Not Found routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: httpStatusText.ERROR,
    msg: "This resource is not available",
  });
});

// Global error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    msg: error.message,
  });
});

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
