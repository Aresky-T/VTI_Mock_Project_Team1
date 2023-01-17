import axios from "axios";

const baseURL = "http://localhost:8080/api/v1/ingredient";

export const getAllIngredients = async () => {
    console.log("call api getAllIngredients...")
    return await axios.get(baseURL);
}

export const createNewIngredient = (data) => {
    return axios.post(baseURL, data)
}