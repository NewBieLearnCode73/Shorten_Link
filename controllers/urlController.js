const URL = require("../models/URL");
const HTTPSTATUS = require("http-status-codes");
const ApiError = require("../Utils/ApiError");
const shortid = require("shortid"); 

exports.handleGenerateNewShortURl = async (req, res) => {
  const body = req.body;
  if (!body.url) throw new ApiError("Please provide url!", HTTPSTATUS.BAD_GATEWAY);

  const shortId = shortid.generate(); 
  const newUrl = await URL.create({
    shortId: shortId, 
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.status(HTTPSTATUS.CREATED).json({
    statusCode: HTTPSTATUS.CREATED,
    message: newUrl,
  });
};

exports.handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  if (!result) throw new ApiError("Url with this shortId not found", HTTPSTATUS.NOT_FOUND);

  return res.status(HTTPSTATUS.OK).json({
    statusCode: HTTPSTATUS.OK,
    message: {
      totalClicks: result.visitHistory.length,
      visitHistory: result.visitHistory,
    },
  });
};

exports.handleToRootURL = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );

  if (!entry) throw new ApiError("Url with this shortId not found", HTTPSTATUS.NOT_FOUND);

  res.redirect(entry.redirectURL);
};
