import axios from "src/config/axios";

export default {
  all: () => axios.get(`/courses`).then((res) => res.data),
};
