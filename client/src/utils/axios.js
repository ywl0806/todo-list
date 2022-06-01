import axios from "axios";

const domain =
  process.env.REACT_APP_SERVER_HOST + process.env.REACT_APP_SERVER_PORT;

// axios.defaults.withCredentials = true;

export const request = (method, url, data) => {
  return axios({
    method,
    url: domain + url,
    data,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
