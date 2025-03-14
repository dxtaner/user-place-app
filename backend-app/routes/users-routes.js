const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const usersController = require("../controllers/users-controller");
const {
  fileUpload,
  handleFileUploadError,
} = require("../middleware/file-upload");

router.use(handleFileUploadError);

const createRouteHandler = (validators, controllerMethod) => {
  return [fileUpload.single("image"), ...validators, controllerMethod];
};

router.get("/", usersController.getUsers);

router.get("/:id", usersController.getUserById);

router.post(
  "/signup",
  createRouteHandler(
    [
      check("name").not().isEmpty(),
      check("email").normalizeEmail({ gmail_remove_dots: false }).isEmail(),
      check("password").isLength({ min: 6 }),
    ],
    usersController.signup
  )
);

router.post("/login", createRouteHandler([], usersController.login));

module.exports = router;
