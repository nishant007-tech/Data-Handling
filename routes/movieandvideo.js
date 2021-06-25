const express = require("express");

const router = express.Router();

const movieandVideoUpload = require("../controllers/movieandvideo");
const {upload}=require("../config/multer")

router.post(
  "/movie/file/upload",
  upload.single("movie"),
  movieandVideoUpload.movieandVideo
);

router.get(
  "/movie/get/moviesandname",
  movieandVideoUpload.getMoviesandMoviesNames
);


router.post(
  "/movie/mergevideos",
  movieandVideoUpload.mergeVideos
);


module.exports = router;
