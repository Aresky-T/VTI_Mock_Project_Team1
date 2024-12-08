import axios from "axios";
import { updateProfileStart } from "../redux/user.slice";
import { configApi } from "./config";
import { onLoading } from "../redux/loading.slice";

const baseUrl = "http://localhost:8080/api/v1/users";

export const getProfile = (token) => {
    const config = configApi(token);
    return axios.get(`${baseUrl}/profile`, config);
}

export const updateProfile = (data, token, dispatch) => {
    const config = configApi(token);
    dispatch(onLoading());
    dispatch(updateProfileStart());
    return axios.put(`${baseUrl}/profile`, data, config);
}


export const updateAvatarApi = (formData, token) => {
    const config = configApi(token);
    return axios.patch(`${baseUrl}/profile/avatar`, formData, config);
}

export const deleteAvatarApi = (token) => {
    const config = configApi(token);
    return axios.delete(`${baseUrl}/profile/avatar`, config);
}