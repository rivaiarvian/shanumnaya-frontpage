import axios from "axios";

import errorHandler from "./errorHandler";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_HOST}`,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

instance.interceptors.response.use((response) => response.data, errorHandler);

export default instance;
