import axios from "axios";

const axiosClient = axios.create({
   baseURL: "http://localhost:8080/api/v1/",
   headers: {
      // "Content-Type": "application/json",
   },
});

export const api = async (method, endpoint, payload) => {
   try {
      const response = await axiosClient(endpoint, { method: method, data: payload });
      return response.data;
   } catch (error) {
      console.log(error);
   }
};
