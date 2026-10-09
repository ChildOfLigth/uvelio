import axios from "axios";

const RETURN_TRANSLATE_FUNC_TYPE = { returnObjects: true };
const BASE_API = axios.create({
  baseURL: "http://localhost:3005",
  withCredentials: true
});

export { RETURN_TRANSLATE_FUNC_TYPE, BASE_API };
