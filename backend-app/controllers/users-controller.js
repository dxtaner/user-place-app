const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user.js");
const { createError } = require("../util/http-error.js");

const getUserById = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate("places");

    if (!user) {
      const error = createError("No user found.", 404);
      return next(error);
    }

    res.json({ user, success: true });
  } catch (err) {
    next(createError("Failed to fetch user from the database.", 500));
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password").populate("places");

    if (!users || users.length === 0) {
      const error = createError("No users found.", 404);
      return next(error);
    }

    const mappedUsers = users.map((user) => user.toObject({ getters: true }));

    res.status(200).json({
      success: true,
      users: mappedUsers,
    });
  } catch (error) {
    next(createError("Failed to fetch users from the database.", 500));
  }
};

const signup = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Invalid information!",
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({
        success: false,
        message: "The provided email already belongs to an account.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 14);

    const createdUser = new User({
      name,
      email,
      password: hashedPassword,
      image: req.file.path,
      places: [],
    });

    await createdUser.save();

    const token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      success: true,
      data: {
        userId: createdUser.id,
        email: createdUser.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Couldn't create user! Please try again later.",
    });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (
      !existingUser ||
      !(await bcrypt.compare(password, existingUser.password))
    ) {
      return res.status(401).json({
        success: false,
        message: "Username or password is incorrect!",
      });
    }

    const token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );

    const responseData = {
      success: true,
      message: "Logged user in!",
      user: {
        userId: existingUser._id,
        user_email: existingUser.email,
      },
      token,
    };

    res.status(200).json(responseData);
  } catch (error) {
    const internalServerError = {
      success: false,
      message: "Couldn't login! Please try again later.",
    };

    res.status(500).json(internalServerError);
  }
};

module.exports = {
  getUsers,
  getUserById,
  signup,
  login,
};
