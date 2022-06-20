const express = require("express");
const router = express.Router();

const { getLivestreamManifestByUsername } = require("../controllers/streams");

router.route("/:username").get(getLivestreamManifestByUsername);

module.exports = router;
