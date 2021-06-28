import axios from "axios";
import qs from "qs";
const callApiFile = async (url, data, method = "GET") => {
  try {
    const response = await axios({
      url,
      data: (data),
      method,
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const callApi = async (url, data = null, method = "GET") => {
  try {
    const response = await axios({
      url,
      data: qs.stringify(data),
      method,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const Api = {
  uploadVideoandFileName: (data) =>
    callApiFile(
      `/movie/file/upload`,
      data,
      "POST"
    ),
  getVideoNameandThumbnail: () =>
    callApiFile(
      `/movie/get/moviesname`,
    ),
  getMoviesandMoviesNames: () =>
    callApiFile(
      `/movie/get/moviesandname`,
    ),
  mergeVideos: (data) =>
    callApi(
      `/movie/mergevideos`,
      data,
      "POST"
    ),
};
// https://dragdropmergeback.herokuapp.com

export default Api;
