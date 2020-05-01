const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect with mongodb enter your password and username
mongoose.connect(
  "Enter here your mongodb url with username and password",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

// Cors
app.use((req, res, next) => {
  // * denotes allow any server if you want perticular server then pass url https://demoserver.com
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );

  // Request methods
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,PATCH,DELETE");
    return res.status(200).json({});
  }

  next();
});

// Routes
app.use("/api/todos", require("./api/routes/todos"));

// Error Handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
