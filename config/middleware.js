const bodyParser = require("body-parser");
const expressFileUpload = require("express-fileupload");
const cors = require("cors");
const fs = require("fs");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  // app.use(
  //   expressFileUpload({
  //     userTepFiles:true,
  //     tempFileDir: "/tmp/",
  //   })
  // )
  if (!fs.existsSync("tmp")) {
    fs.mkdirSync("tmp");
  }
  if (!fs.existsSync("tmpoutput")) {
    fs.mkdirSync("tmpoutput");
  }
};
