const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: {
    fileSize: 5000000,
  },
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploads/images");
    },
    filename: (req, file, callback) => {
      const fileExtension = MIME_TYPE_MAP[file.mimetype];
      callback(null, `${uuidv4()}.${fileExtension}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mimetype!");
    callback(error, isValid);
  },
});

function handleFileUploadError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        error: "File size is too large. Maximum allowed size is 5000KB.",
      });
    }
  }
  next(err);
}

module.exports = { fileUpload, handleFileUploadError };
