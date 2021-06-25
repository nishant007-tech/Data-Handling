const ffmpeg = require("../config/ffmpeg");
const MovieandName= require("../models/movieonly.model");

exports.movieandVideo = async (req, res, next) => {
  try {
    await ffmpeg.videoConvert(
      req,
      res,
      next,
      req.file,
      req.body.movieName,
    );
  } catch (err) {
    return res.error(`SomeThing Went Wrong!!`, err);
  }
};

exports.getMoviesandMoviesNames = async (req, res, next) => {
    try {
      const data= await MovieandName.find().limit(4).sort({"updatedAt":-1});
      return res.send(data);
    } catch (err) {
      return res.error(`SomeThing Went Wrong!!`, err);
    }
  };
  exports.mergeVideos = async (req, res, next) => {
    try {
        await ffmpeg.mergeVideos(req, res, next,req.body.data);
      
    } catch (err) {
      return res.error(`SomeThing Went Wrong!!`, err);
    }
  };