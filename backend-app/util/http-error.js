class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.name = this.constructor.name;
  }
}

function createError(message, statusCode = 500) {
  return new HttpError(message, statusCode);
}

module.exports = { createError };
