const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const s3Client = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const uploadParams = {
  Bucket: process.env.AWS_BUCKET_NAME,
  Key: '', // pass key
  Body: null, // pass file body
  ACL: 'public-read',
};

exports.uploadFile =  async (file) =>{
  const myFileName=file.originalname.split(".");
  const fileType=myFileName[myFileName.length-1]
  uploadParams.Key=`${uuidv4()}.${fileType}`,
  uploadParams.Body = file.buffer;
  let data = await s3Client.upload(uploadParams).promise();
  return data;
}


exports.uploadVideo =  async (file) =>{
  const myFileName=file.name.split(".");
  const fileType=myFileName[myFileName.length-1]
  uploadParams.Key=`${uuidv4()}.${fileType}`,
  uploadParams.Body = file.data;
  console.log(`File is uploadding`)
  let data = await s3Client.upload(uploadParams).promise();
  return data;
}