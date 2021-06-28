const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
console.log(ffmpegPath);
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const { getVideoDurationInSeconds } = require("get-video-duration");
const fs = require("fs");
const s3 = require("../config/s3");
const path = require("path");
const MovieOnly = require("../models/movieonly.model");

exports.videoConvert = async (req, res, next, file, movieName) => {
  const duration = await getVideoDurationInSeconds(
    "tmp/" + file.fieldname + path.extname(file.originalname)
  );
  if (duration > 60) {
    fs.unlinkSync("tmp/" + file.fieldname + path.extname(file.originalname));
    return res.error("Please Upload less than 60 seconds Video...");
  }
  res.success("The video is uploadding...");
  const mailfilePath =
    "tmp/" + file.fieldname + path.extname(file.originalname);
  const numberofVideo =
    duration % 10 === 0 ? parseInt(duration / 10) : parseInt(duration / 10) + 1;
  const fileExtension = path.extname(file.originalname);
  let fileName = file.fieldname;
  const videoPaths = [];
  for (let i = 0; i < numberofVideo; i++) {
    videoPaths.push(`tmpoutput/${fileName} ${i}.${fileExtension}`);
    ffmpeg("tmp/" + file.fieldname + path.extname(file.originalname))
      .setStartTime(i * 10)
      .setDuration(10)
      .output(`tmpoutput/${fileName}${i}.${fileExtension}`)
      .on("end", async (err) => {
        if (!err) {
          console.log("Video Convert in part", i);
          let filepart = {};
          const path = `tmpoutput/${fileName}${i}.${fileExtension}`;
          const stat = fs.statSync(path);
          const fileSize = stat.size;
          const buffer = fs.readFileSync(path);
          filepart.originalname = `${fileName}${i}.${fileExtension}`;
          filepart.buffer = buffer;
          filepart.size = fileSize;
          filepart.encoding = file.encoding;
          filepart.tempFilePath = file.tempFilePath;
          filepart.mimetype = file.mimetype;
          filepart.truncated = file.truncated;
          filepart.md5 = file.md5;
          filepart.mv = file.mv;
          const responce = await s3.uploadFile(filepart);
          const movieOnly = new MovieOnly({
            movieName: `${movieName} ${i}`,
            videoFIle: responce.Location,
          });
          await movieOnly.save();
          fs.unlinkSync(path);
          if (fs.existsSync(mailfilePath)) {
            fs.unlinkSync(mailfilePath);
          }
        }
      })
      .on("error", function (err) {
        console.log("error: ", err);
      })
      .run();
  }
};

exports.mergeVideos = async (req, res, next, files) => {
  let mergeClips = ffmpeg();
  files.forEach((data) => {
    mergeClips.input(data.videoFIle);
  });
  mergeClips
    .on("error", function (err) {
      console.log("An error occurred: " + err.message);
    })
    .on("end", async () => {
      console.log("Merging finished !");
      let filepart = {};
      const path = "tmp/merged.mov";
      const stat = fs.statSync(path);
      const fileSize = stat.size;
      const buffer = fs.readFileSync(path);
      filepart.originalname = `merged.mov`;
      filepart.buffer = buffer;
      filepart.size = fileSize;
      const responce = await s3.uploadFile(filepart);
      if (fs.existsSync("tmp/merged.mov")) {
        fs.unlinkSync("tmp/merged.mov");
      }
      return res.send(responce.Location);
    })
    .mergeToFile("tmp/merged.mov", "tmpoutput");
};
