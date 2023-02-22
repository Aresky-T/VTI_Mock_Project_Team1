import axios from "axios";

const baseUrl = "http://localhost:8080/api/v1/comment"

export const getCommentsApi = (recipeId) => {
    return axios.get(`${baseUrl}/recipe-id/${recipeId}`);
}

export const createCommentApi = (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return axios.post(baseUrl ,data, config)
}

export const updateCommentApi = (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return axios.put(baseUrl ,data, config)
}