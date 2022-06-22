const express = require("express");
const router = express.Router();

const {
  getLivestreamManifestSignatureByUsername,
} = require("../controllers/streams");

router
  .route("/:username/manifest-signature")
  .get(getLivestreamManifestSignatureByUsername);

module.exports = router;
