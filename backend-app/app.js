const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const placesRoutes = require("./routes/places-routes.js");
const usersRoutes = require("./routes/users-routes.js");
const HttpError = require("./util/http-error.js");

const app = express();

app.use(bodyParser.json());
app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  next(new HttpError("Couldn't find route!", 404));
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.error(err);
    });
  }

  if (res.headersSent) {
    return next(error);
  }

  console.error("Error:", error);
  res
    .status(error.code || 500)
    .json({ message: error.message || "An error occurred!" });
});

mongoose
  .connect(process.env.DB_CONNECTION_STRING, {})
  .then(() => {
    console.log("Connected to the database");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
