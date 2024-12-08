import axios from "axios";
import { configApi } from "./config";

const baseUrl = "http://localhost:8080/api/v1/point"

export const getPointHistoryForUserApi = (token) => {
    return axios.get(`${baseUrl}/changed-history`, configApi(token));
}