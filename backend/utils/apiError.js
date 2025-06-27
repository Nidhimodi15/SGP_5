class apiError extends Error {
  constructor(message, statusCode,stack="") {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default apiError;
