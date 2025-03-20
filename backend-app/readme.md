
Express Backend API for Places and Users
========================================

This is a backend server built with Express.js for managing places and users. It communicates with a MongoDB database and provides RESTful API routes to interact with places and users. The server also includes support for file uploads and user authentication.

Features
--------

*   **User Routes**: Create, register, and authenticate users.
*   **Places Routes**: Manage places, including creating, updating, retrieving, and deleting places.
*   **File Uploads**: Upload and serve images related to places.
*   **CORS**: The API supports CORS, allowing frontend applications to make requests from different origins (e.g., React app running on `localhost:3000`).
*   **Error Handling**: Custom error handling to manage HTTP errors.

Technologies Used
-----------------

*   **Node.js**: JavaScript runtime for building the server.
*   **Express.js**: Web framework for Node.js.
*   **MongoDB**: NoSQL database for storing data (places and users).
*   **Mongoose**: MongoDB object modeling for Node.js.
*   **CORS**: Cross-Origin Resource Sharing for enabling cross-origin requests.
*   **dotenv**: Environment variable management.
*   **body-parser**: Middleware for parsing request bodies.
*   **fs (File System)**: Handling file operations like file deletion.

Setup Instructions
------------------

### Prerequisites

*   Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v12 or later)
*   MongoDB (running locally or using a cloud-based database like MongoDB Atlas)

### Installation

1.  Clone the repository to your local machine:

    git clone <repository-url>

3.  Navigate to the project directory:

    cd <project-directory>

5.  Install the necessary dependencies:

    npm install

7.  Create a `.env` file in the root of your project and add the following:

    DB_CONNECTION_STRING=<your_mongo_db_connection_string>

Replace `<your_mongo_db_connection_string>` with your actual MongoDB connection string.

10.  Run the server:

    npm start

The server will start on `http://localhost:5000`.

API Endpoints
-------------

### /api/places

*   **GET**: Retrieve all places.
    
        GET http://localhost:5000/api/places
    
*   **POST**: Create a new place.
    
        POST http://localhost:5000/api/places
    
    Body: JSON with place details.
    
*   **PUT**: Update a place by its ID.
    
        PUT http://localhost:5000/api/places/:placeId
    
    Body: JSON with updated place details.
    
*   **DELETE**: Delete a place by its ID.
    
        DELETE http://localhost:5000/api/places/:placeId
    

### /api/users

*   **POST**: Register a new user.
    
        POST http://localhost:5000/api/users/register
    
    Body: JSON with user registration details (e.g., username, email, password).
    
*   **POST**: Login a user.
    
        POST http://localhost:5000/api/users/login
    
    Body: JSON with login credentials (e.g., email, password).
    

### /uploads/images

*   **GET**: Retrieve uploaded images.
    
        GET http://localhost:5000/uploads/images/<image-file-name>
    

Folder Structure
----------------

    src/
      controllers/       - Handles business logic for the routes (places, users).
      routes/            - Defines all API routes.
      models/            - Mongoose models for the database (e.g., User, Place).
      util/              - Utility files (e.g., error handling).
      uploads/           - Directory for storing uploaded images.
      app.js             - Main Express app file.
      .env               - Environment variables for sensitive information (e.g., DB connection string).
    

Error Handling
--------------

If an error occurs during a request, the server will respond with a JSON object containing the error message and HTTP status code.

    
    {
      "message": "An error occurred!",
      "statusCode": 500
    }
      

Contributing
------------

Feel free to fork this repository and submit pull requests. Ensure you follow best practices, write clean code, and add any necessary documentation.

License
-------

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
