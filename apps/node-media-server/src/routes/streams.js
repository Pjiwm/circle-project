const express = require("express");
const router = express.Router();

const { getLivestream } = require("../controllers/streams");

router.route("/:username").get(getLivestream);

module.exports = router;
