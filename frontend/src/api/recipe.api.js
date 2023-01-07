import axios from "axios";

const baseURL = "localhost:8080/api/v1/recipes";

export const createRecipe = async (dataObj, tokenUser) => {
    const config = {
        Authorization: `Bearer ${tokenUser}`
    }
    return await axios.post(baseURL, dataObj);
}

export const getRecipe = async (id, tokenUser) => {
    
}