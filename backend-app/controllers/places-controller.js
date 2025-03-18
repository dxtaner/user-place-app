const fs = require("fs");

const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const Place = require("../models/place.js");
const User = require("../models/user");
const getCoordinatesFromAddress = require("../util/location.js");
const { createError } = require("../util/http-error.js");

const getPlaceById = async (req, res, next) => {
  const { placeId } = req.params;
  let place;

  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    return next(createError("Couldn't find a place for the given ID!", 404));
  }

  if (!place) {
    return next(createError("Couldn't find a place for the given ID!", 404));
  }

  res.json({
    success: true,
    place: place.toObject({ getters: true }),
  });
};

const getPlaces = async (req, res, next) => {
  try {
    const places = await Place.find();
    res.json({
      success: true,
      places: places.map((place) => place.toObject({ getters: true })),
    });
  } catch (err) {
    return next(createError("Error fetching places from the database!", 500));
  }
};

const getPlacesByUserId = async (req, res, next) => {
  const { userId } = req.params;
  let places;

  try {
    const user = await User.findById(userId).populate("places");

    places = user.places;
  } catch (err) {
    return next(
      createError("Couldn't fetch places for the given user ID!", 404)
    );
  }

  if (!places) {
    return next(
      createError("Couldn't fetch places for the given user ID!", 404)
    );
  }

  res.json({
    success: true,
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(createError("Invalid information!", 422));
  }

  const { title, description, address } = req.body;
  let coordinates, user;

  try {
    coordinates = await getCoordinatesFromAddress(address);
  } catch (err) {
    return next(
      createError("The entered address is not a valid address!", 406)
    );
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: req.file.path,
    creator: req.user.userId,
  });

  try {
    user = await User.findById(req.user.userId);
  } catch (err) {
    return next(createError("Place creation failed!", 500));
  }

  if (!user) {
    return next(createError("Couldn't find user for provided ID!", 404));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await createdPlace.save({ session });

    user.places.push(createdPlace);
    await user.save({ session });

    await session.commitTransaction();
  } catch (err) {
    return next(createError("Couldn't write data to database!", 500));
  }

  res.status(201).json({ success: true, place: createdPlace });
};

const updatePlaceById = async (req, res, next) => {
  const { placeId } = req.params;
  const { title, description } = req.body;

  let place;

  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    return next(createError("Couldn't find place for the given ID!", 500));
  }

  if (!place) {
    return next(createError("Place not found!", 404));
  }

  if (place.creator.id.toString() !== req.user.userId) {
    return next(createError("You can't update places that don't belong to you!", 401));
  }

  place.title = title || place.title;  
  place.description = description || place.description;  

  try {
    const updatedPlace = await place.save();

    res.status(200).json({
      message: "Place updated successfully!",
      place: updatedPlace,
    });
  } catch (err) {
    return next(createError("Couldn't update place!", 500));
  }
};

const deletePlaceById = async (req, res, next) => {
  const { placeId } = req.params;
  let place;

  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    return next(createError("Couldn't find place for the given ID!", 500));
  }

  if (!place) {
    return next(createError("Place not found!", 404));
  }

  if (place.creator.id.toString() !== req.user.userId) {
    return next(createError("You can't delete places that don't belong to you!", 401));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await place.deleteOne({ session });

    place.creator.places.pull(place);
    await place.creator.save({ session });

    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    return next(createError("Couldn't remove place!", 500));
  }

  if (place.image) {
    fs.unlink(place.image, (err) => {
      if (err) {
        console.log("Error deleting image file:", err);
      }
    });
  }

  res.status(200).json({ message: "Place deleted successfully!" });
};


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
exports.getPlaces = getPlaces;
