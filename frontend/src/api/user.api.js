import axios from "axios";
import { updateAvatarStart, updateProfileStart } from "../redux/user.slice";

const baseUrl = "http://localhost:8080/api/v1/users";

export const getProfile = (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    return axios.get(`${baseUrl}/profile`, config);
}

export const updateProfile = (data, token, dispatch) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    dispatch(updateProfileStart());
    return axios.put(`${baseUrl}/profile`, data, config);
}


export const updateAvatarApi = (data, token, dispatch) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    dispatch(updateAvatarStart());
    return axios.put(`${baseUrl}/profile/avatar`, data, config);
}