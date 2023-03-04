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

export const getRecipeDetail = async (id) => {
    return axios.get(`${baseURL}/recipes/${id}`);
}

export const getAllRecipes = async (search, page, size) => {
    return await axios.get(`${baseURL}/recipes`, {params: {search, page, size}});
}