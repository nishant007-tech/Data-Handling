const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieOnlySchema = new Schema(
  {
    movieName: {
      type: String,
      trim: true,
    },
    videoFIle: {
      type: String,
      trim: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("movieonly", movieOnlySchema);
