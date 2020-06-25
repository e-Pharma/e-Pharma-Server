const express = require("express");
const router = express.Router();
const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      console.log(file)
      cb(null, file.fieldname)
    }
})
const upload = multer({ storage: storage })

const handler = require("../handlers/image_upload");

router.post("/check_quality", upload.any(), handler.calculateImageQuality);

module.exports = router;
