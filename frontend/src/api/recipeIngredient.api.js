import axios from "axios";
import { configApi } from "./config";

const baseURL = "http://localhost:8080/api/v1/recipe-ingredient";

export const addListIngredients = (data, token) => {
    const config = configApi(token);
    return axios.post(baseURL, data, config);
}