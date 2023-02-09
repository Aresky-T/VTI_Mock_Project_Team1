import axios from "axios";

const baseURL = "http://localhost:8080/api/v1/recipe-ingredient";

export const addListIngredients = (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }
    return axios.post(baseURL, data, config);
}