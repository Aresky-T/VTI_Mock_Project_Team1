import axios from 'axios';

const baseURL = `http://localhost:8080/api/v1/voting`;

export const createVotingApi = (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return axios.post(baseURL, data, config)
}

export const getStarsApi = (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return axios.get(baseURL, {params: {
        userId: data.userId,
        recipeId: data.recipeId
    }}, config)
}

export const updateStarsApi = (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return axios.put(baseURL, data, config)
}

export const getAverageStarsApi = (recipeId) => {
    return axios.get(`${baseURL}/average-stars/${recipeId}`)
}

export const getAllUsersVotedApi = (recipeId) => {
    return axios.get(`${baseURL}/all-users-voted/${recipeId}`)
}