import axios from "axios";
import { configApi } from "./config";

const baseUrl = "http://localhost:8080/api/v1/comments"

export const getCommentCountForCurrentRecipeApi = (recipeId) => {
    return axios.get(`${baseUrl}/recipe-comment/count`, {
        params: {
            recipeId: recipeId,
            type: "TOP"
        }
    })
}

export const getCommentListForCurrentRecipeApi = (recipeId, referenceCommentId, size, sort) => {
    const params = new URLSearchParams();
    params.set("recipeId", recipeId);
    params.set("size", size);
    params.set("sort", sort)

    if (referenceCommentId) params.set("referenceCommentId", referenceCommentId);

    return axios.get(`${baseUrl}/recipe-comment/recipe/${recipeId}?${params}`);
}

export const getCommentListForCurrentRecipeAndLoggedInUserApi = (recipeId, referenceCommentId, size, sort, accessToken) => {
    const params = new URLSearchParams();
    params.set("recipeId", recipeId);
    params.set("size", size);
    params.set("sort", sort)

    if (referenceCommentId) params.set("referenceCommentId", referenceCommentId);

    return axios.get(`${baseUrl}/recipe-comment/recipe/${recipeId}/for-logged-in-user?${params}`, configApi(accessToken));
}

export const getCommentForCurrentUserApi = (recipeId, token) => {
    return axios.get(`${baseUrl}/get-one-for-logged-in-user/recipe-id/${recipeId}`, configApi(token));
}

export const getAllReplyCommentListApi = (commentId, referenceSubCommentId, size) => {
    const params = new URLSearchParams();
    params.set("commentId", commentId);
    params.set("size", size);
    if (referenceSubCommentId) params.set("referenceSubCommentId", referenceSubCommentId);

    return axios.get(`${baseUrl}/recipe-comment/reply/comment/${commentId}?${params}`)
}

export const getAllReplyCommentListAndLoggedInUserApi = (commentId, referenceSubCommentId, size, accessToken) => {
    const params = new URLSearchParams();
    params.set("commentId", commentId);
    params.set("size", size);
    if (referenceSubCommentId) params.set("referenceSubCommentId", referenceSubCommentId);

    return axios.get(`${baseUrl}/recipe-comment/reply/comment/${commentId}/for-logged-in-user?${params}`, configApi(accessToken))
}

export const createRecipeCommentApi = (recipeId, message, token) => {
    const config = configApi(token);
    return axios.post(`${baseUrl}/recipe-comment`, {
        recipeId: recipeId,
        message: message,
    }, config)
}

export const createRecipeCommentReplyApi = (commentId, message, token) => {
    const config = configApi(token);
    return axios.post(`${baseUrl}/recipe-comment/reply`, {
        parentCommentId: commentId,
        message: message,
    }, config)
}

export const updateRecipeCommentApi = (commentId, message, token) => {
    const config = configApi(token);
    return axios.patch(`${baseUrl}/recipe-comment`, {
        commentId: commentId,
        message: message,
    }, config)
}

export const deleteRecipeComment = (commentId, token) => {
    return axios.delete(`${baseUrl}?commentId=${commentId}`, configApi(token))
}