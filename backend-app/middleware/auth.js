const jwt = require("jsonwebtoken");
require("dotenv").config();

const HttpError = require("../util/http-error.js");

function isAuth(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw new Error();
    }

    req.user = jwt.verify(token, process.env.JWT_KEY);

    next();
  } catch (err) {
    return next(new HttpError("Authentication failed!", 403));
  }
}

module.exports = isAuth;
