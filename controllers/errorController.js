const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  const message = `duplicate field value: ${value}, another tour with same name exists`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const message = err.message;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid Token, please log in again', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired please log in again.', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational error send message to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // programming or other unexpected errors: don't leak details!
  } else {
    // 1. log error
    console.error('ERROR 💥:', err);

    // 2. send generic message
    res.status(err.statusCode).json({
      status: 500,
      message: 'something went very wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  // gap after production is necessary
  if (process.env.NODE_ENV === 'production ') {
    let error = { ...err, name: err.name, message: err.message }; // for some reason name and msg does not get included in error from err object

    if (error.name === 'CastError') error = handleCastErrorDB(error);

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    if (error.name === 'ValidationError')
      error = handleValidationError(error);

    if (error.name === 'JsonWebTokenError') error = handleJWTError();

    if (error.name === 'TokenExpiredError')
      error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
