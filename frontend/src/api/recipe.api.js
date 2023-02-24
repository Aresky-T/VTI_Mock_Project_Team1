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

export const getRecipeDetailBeforeLoginApi = async (id) => {
    return axios.get(`${baseURL}/recipes/before-login/${id}`);
}

export const getRecipeDetailAfterLoginApi = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return axios.get(`${baseURL}/recipes/after-login/${id}`, config);
}

export const getAllRecipes = async (search, page, size) => {
    return await axios.get(`${baseURL}/recipes`, {params: {search, page, size}});
}