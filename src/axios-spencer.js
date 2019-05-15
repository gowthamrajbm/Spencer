import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.classix.xyz/spencer"
});

export default instance;
