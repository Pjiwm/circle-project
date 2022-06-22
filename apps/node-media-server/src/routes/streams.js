const express = require("express");
const router = express.Router();

const {
  getLivestreamManifestSignatureByUsername,
  getStreamSegmentsSignaturesByUsername,
} = require("../controllers/streams");

router
  .route("/:username/manifest-signature")
  .get(getLivestreamManifestSignatureByUsername);

router
  .route("/:username/segments-signature/:segment")
  .get(getStreamSegmentsSignaturesByUsername);

module.exports = router;
