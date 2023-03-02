import axios from "axios";
import { updateAvatarStart, updateProfileStart } from "../redux/user.slice";
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


export const updateAvatarApi = (data, token, dispatch) => {
    const config = configApi(token);
    dispatch(onLoading());
    dispatch(updateAvatarStart());
    return axios.put(`${baseUrl}/profile/avatar`, data, config);
}

export const deleteAvatarApi = (userId, token) => {
    const config = configApi(token);
    return axios.put(`${baseUrl}/delete-avatar/${userId}`, config);
}