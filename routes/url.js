const express = require("express")
const router = express.Router();
const { handleGenerateNewShortURl, handleGetAnalytics, handleToRootURL } = require("../controllers/urlController");

router.post("/", handleGenerateNewShortURl)
router.get("/:shortId", handleToRootURL);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router