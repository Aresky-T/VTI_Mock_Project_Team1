import axios from "axios";
import {configApi} from '../api/config';

const baseURL = "http://localhost:8080/api/v1";

export const createRecipeApi = async (dataObj, tokenUser) => {
    const config = configApi(tokenUser);
    return await axios.post(`${baseURL}/recipes`, dataObj, config);
}

export const createRecipeIngredientApi = async (dataObj, tokenUser) => {
    const config = configApi(tokenUser);
    return await axios.post(`${baseURL}/recipe-ingredient`, dataObj, config);
}

export const getRecipeDetailBeforeLoginApi = async (id) => {
    return axios.get(`${baseURL}/recipes/before-login/${id}`);
}

export const getRecipeDetailAfterLoginApi = async (id, tokenUser) => {
    const config = configApi(tokenUser)
    return axios.get(`${baseURL}/recipes/after-login/${id}`, config);
}

export const getAllRecipesApi = async (search, page, size) => {
    return await axios.get(`${baseURL}/recipes`, {params: {search, page, size}});
}

export const getAllRecipesForCreatorApi = async (currentUser) => {
    const creatorId = currentUser.id;
    const token = currentUser.token;
    const config = configApi(token);
    return await axios.get(`${baseURL}/recipes/get-list-for-creator/${creatorId}`, config);
}

export const updateRecipeByCreatorApi = async (recipeId, data, token) => {
    const config = configApi(token);
    return await axios.put(`${baseURL}/recipes/${recipeId}`, data, config);
}

export const deleteRecipeByIdApi = async (data) => {
    console.log(data);
    return axios.delete(`${baseURL}/recipes/delete-by-id`, {params: {...data}});
}