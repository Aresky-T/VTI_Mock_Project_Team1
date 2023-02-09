import axios from "axios";

const baseURL = "http://localhost:8080/api/v1";

export const createRecipe = async (dataObj, tokenUser) => {
    const config = {
        headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${tokenUser}`
        }
    }

    return await axios.post(`${baseURL}/recipes`, dataObj, config);
}

export const createRecipeIngredient = async (dataObj, tokenUser) => {
    const config = {
        headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${tokenUser}`
        }
    }
    return await axios.post(`${baseURL}/recipe-ingredient`, dataObj, config);
}

export const getRecipe = async (id, tokenUser) => {
    return axios.get(baseURL);
}

export const getAllRecipes = async (search) => {
    return await axios.get(`${baseURL}/recipes`, {params: {search}});
}