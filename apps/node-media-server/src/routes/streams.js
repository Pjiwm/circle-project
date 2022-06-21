const express = require("express");
const router = express.Router();

const {
  getLivestreamManifestSignatureByUsername,
} = require("../controllers/streams");

router.route("/:username").get(getLivestreamManifestSignatureByUsername);

module.exports = router;
