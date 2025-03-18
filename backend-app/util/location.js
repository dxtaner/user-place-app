const axios = require("axios");
require("dotenv").config();

const HttpError = require("../util/http-error.js");

const getCoordinatesFromAddress = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );

    // console.log("Google API Response:", response.data); 

    const data = response.data;

    if (!data || data.status === "ZERO_RESULTS") {
      throw new HttpError("Couldn't find coordinates for the specified address!", 422);
    }

    if (!data.results || data.results.length === 0) {
      throw new HttpError("No results found for the given address!", 422);
    }

    const coordinates = data.results[0].geometry.location;

    return coordinates;
  } catch (error) {
    console.log("API Error:", error);
    throw new HttpError("Something went wrong while fetching coordinates.", 500);
  }
};

module.exports = getCoordinatesFromAddress;
