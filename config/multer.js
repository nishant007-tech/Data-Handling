const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'tmp')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname+path.extname(file.originalname))
    }
  })

exports.upload =multer({ storage: storage});