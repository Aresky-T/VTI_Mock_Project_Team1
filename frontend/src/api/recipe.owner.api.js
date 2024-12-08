import axios from "axios";
import { configApi } from "./config";

const baseURL = "http://localhost:8080/api/v1/recipe-owner";

export const checkRecipeOwnershipApi = (recipeId, token) => {
    return axios.get(`${baseURL}/ownership`, {
        params: { recipeId: recipeId },
        headers: configApi(token).headers,
    })
}

export const disableRecipeOwnershipForUserApi = (recipeId, token) => {
    return axios.delete(`${baseURL}/ownership?recipeId=${recipeId}`, configApi(token))
}