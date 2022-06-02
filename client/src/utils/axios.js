import axios from "axios";

axios.defaults.withCredentials = true;

export const request = async (method, url, data) => {
  return await axios({
    method,
    url: url,
    data,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
