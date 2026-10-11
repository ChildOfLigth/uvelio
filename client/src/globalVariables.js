import axios from "axios";

const RETURN_TRANSLATE_FUNC_TYPE = { returnObjects: true };
const BASE_API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export { RETURN_TRANSLATE_FUNC_TYPE, BASE_API };