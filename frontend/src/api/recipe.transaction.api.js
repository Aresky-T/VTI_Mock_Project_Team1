import axios from "axios";
import { configApi } from "./config";

const baseUrl = "http://localhost:8080/api/v1/recipe-transaction";

export const createPurchaseRecipeTransactionApi = (recipeId, token) => {
    return axios.post(baseUrl, null, {
        params: { recipeId: recipeId },
        headers: configApi(token).headers
    })
}

export const getAllRecipeTransactionsApi = (token) => {
    return axios.get(`${baseUrl}/all/user`, configApi(token));
}