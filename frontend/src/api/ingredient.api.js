import axios from "axios";

const baseURL = "localhost:8080/api/v1/ingredient";

export const getAllIngredient = async () => {
    return await axios.get(baseURL);
}