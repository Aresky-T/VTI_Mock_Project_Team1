import axios from 'axios';
import { configApi } from './config';

const baseURL = `http://localhost:8080/api/v1/voting`;

export const createVotingApi = (data, token) => {
    const config = configApi(token);
    return axios.post(baseURL, data, config)
}

export const getStarsApi = (params, token) => {
    const config = configApi(token);
    return axios.get(baseURL, {
        params: {
            userId: params.userId,
            recipeId: params.recipeId
        }
    }, config)
}

export const updateStarsApi = (data, token) => {
    const config = configApi(token);
    return axios.put(baseURL, data, config)
}

export const getAverageStarsApi = (recipeId) => {
    return axios.get(`${baseURL}/average-stars/${recipeId}`)
}

export const getAllUsersVotedApi = (recipeId) => {
    return axios.get(`${baseURL}/all-users-voted/${recipeId}`)
}