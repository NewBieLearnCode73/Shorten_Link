const ApiError = require("../Utils/ApiError")
const HTTPSTATUS = require("http-status-codes")

module.exports = (req, res, next) => {
  next(new ApiError("URL not found!", HTTPSTATUS.NOT_FOUND));
};