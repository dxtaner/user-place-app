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

    const data = response.data;

    if (!data || data.status === "ZERO_RESULTS") {
      throw new HttpError(
        "Couldn't find coordinates for the specified address!",
        422
      );
    }

    const coordinates = data.results[0].geometry.location;

    return coordinates;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.log("Error response data:", error.response.data);
      console.log("Error response status:", error.response.status);
      console.log("Error response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log("Error request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error message:", error.message);
    }

    // Handle Axios errors or other unexpected errors
    throw new HttpError(
      "Something went wrong while fetching coordinates.",
      500
    );
  }
};

module.exports = getCoordinatesFromAddress;
