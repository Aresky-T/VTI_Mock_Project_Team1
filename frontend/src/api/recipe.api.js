import axios from "axios";
import { configApi } from '../api/config';

const baseURL = "http://localhost:8080/api/v1/recipes";

export const createRecipeApi = (formData, tokenUser) => {
    const config = configApi(tokenUser);
    return axios.post(
        baseURL,
        formData,
        {
            headers: {
                ...config.headers,
                'Content-Type': 'multipart/form-data',
            }
        });
}

export const getRecipeDetailsApi = (recipeId) => {
    return axios.get(`${baseURL}/one/details`, {
        params: { recipeId: recipeId }
    })
}

export const getRecipeDetailsForCreatorApi = (recipeId, token) => {
    return axios.get(`${baseURL}/one/details-for-creator`, {
        params: { recipeId: recipeId },
        headers: configApi(token)["headers"],
    })
}

export const getRecipeDetailsForOwnerApi = (recipeId, token) => {
    return axios.get(`${baseURL}/one/details-for-owner`, {
        params: { recipeId: recipeId },
        headers: configApi(token)["headers"],
    })
}

export const getAllRecipesApi = (search, page, size) => {
    const params = new URLSearchParams();
    params.set("page", page);
    params.set("size", size);

    if (search) {
        params.set("search", search);
    }

    return axios.get(`${baseURL}?${params}`);
}

export const getAllRecipesForCreatorApi = (currentUser) => {
    const creatorId = currentUser.id;
    const token = currentUser.token;
    const config = configApi(token);
    return axios.get(`${baseURL}/get-list-for-creator/${creatorId}`, config);
}

export const getAllCreatedRecipeForUserApi = (token) => {
    return axios.get(`${baseURL}/all/created`, configApi(token));
}

export const getAllPurchasedRecipeForUserApi = (token) => {
    return axios.get(`${baseURL}/all/purchased`, configApi(token));
}

export const checkRecipeExistsApi = (recipeId) => {
    return axios.get(`${baseURL}/one/check-exists`, {
        params: { recipeId: recipeId },
    })
}

export const updateRecipeByCreatorApi = (recipeId, data, token) => {
    const config = configApi(token);
    return axios.put(`${baseURL}/${recipeId}`, data, config);
}

export const updateRecipeApi = (formData, token) => {
    return axios.put(`${baseURL}`, formData, configApi(token));
}

export const deleteRecipeByIdApi = (recipeId, token) => {
    return axios.delete(`${baseURL}?recipeId=${recipeId}`, configApi(token));
}