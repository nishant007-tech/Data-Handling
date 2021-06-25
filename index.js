const app = require("express")();
const mongoose = require("mongoose");

const chalk = require("chalk");
require("dotenv").config();
const constant = require("./config/constants");
const PORT = constant.PORT || 5000;
const middlewaresConfig = require("./config/middleware");
middlewaresConfig(app);

const movieandvideo = require("./routes/movieandvideo");

const { Response } = require("./models/responce.model");
app.response.unauthorizedUser = function (message, data, displayMessage, code) {
  console.log(chalk.yellow("Unauthorized User"));
  this.status(200).send(
    Response(
      "error",
      "Unauthorized User",
      { displayMessage: `User is Unauthorized` },
      undefined,
      403
    )
  );
};

app.response.success = function (message, data, displayMessage, code) {
  console.log(chalk.green(message));
  this.status(200).send(
    Response("success", message, data, displayMessage, code)
  );
};

app.response.error = function (message, data, displayMessage, code) {
  console.log(chalk.red(message));
  if (data) {
    console.log(chalk.red(data));
  }
  message = typeof message != "string" ? "Something went wrong" : message;
  this.status(200).send(Response("error", message, data, displayMessage, code));
};

app.use(movieandvideo);


if (process.env.NODE_ENV == "production") {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

mongoose
  .connect(constant.MONGODB_URI)
  .then((result) => {
    console.log(
      chalk.green.bold(
        `
        Yep this is working 🍺
        App listen on port: ${constant.PORT} 🍕
        Env: ${process.env.NODE_ENV} 🦄
      `
      )
    );
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(chalk.red("Cannot run!", err));
  });

