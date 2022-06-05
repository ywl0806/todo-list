import axios from "axios";

axios.defaults.withCredentials = true;
// axios.defaults.timeout = 5 * 1000;
const host =
  process.env.REACT_APP_MODE === "production"
    ? process.env.REACT_APP_SERVER_HOST + process.env.REACT_APP_SERVER_PORT
    : "";
export const request = async (method, url, data) => {
  return await axios({
    method,
    url: host + url,
    data,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
