import axios from "axios";

const baseUrl = "http://localhost:8080/api/v1/users";

export const getProfile = (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    return axios.get(`${baseUrl}/profile`, config);
}