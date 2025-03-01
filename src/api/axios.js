// api/axios.js

import axios from "axios";

export const axiosClient = axios.create({
  basedURL: import.meta.env.VITE_BACKEND_URL,
});
