class AppError extends Error {
  constructor() {
    super();
  }

  make(message, statusCode, statusText) {
    this.message = message;
    this.statusCode = statusCode;
    this.statusText = statusText;
    return this;
  }
}

module.exports = new AppError();
