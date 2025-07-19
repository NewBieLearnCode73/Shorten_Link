const HTTPSTATUS = require("http-status-codes")

module.exports = (err, req, res, next) => {
  console.error(err.message);
  res.status(err.statusCode || HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    statusCode: err.statusCode || HTTPSTATUS.INTERNAL_SERVER_ERROR,
    message: err.message || "Internal Server Error!",
  });
};