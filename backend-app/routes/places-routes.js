const express = require("express");
const { check } = require("express-validator");

const placesController = require("../controllers/places-controller");
const fileUploadMiddleware = require("../middleware/file-upload");
const isAuthMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/places/:placeId", placesController.getPlaceById);
router.get("/places", placesController.getPlaces);
router.get("/places/user/:userId", placesController.getPlacesByUserId);

router.use(isAuthMiddleware);

router.post(
  "/places",
  [
    fileUploadMiddleware.fileUpload.single("image"),
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesController.createPlace
);

router.patch(
  "/places/:placeId",
  [
    check("title").not().isEmpty().withMessage("Title is required."),
    check("description")
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters long."),
  ],
  placesController.updatePlaceById
);

router.delete("/places/:placeId", placesController.deletePlaceById);

module.exports = router;
