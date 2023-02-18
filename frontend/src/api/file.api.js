import axios from "axios";

const baseURL = 'http://localhost:8080/api/v1/files';

export const upLoadFiles = async (file, token) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    }
    const body = {
        'image': file
    }
    return await axios.post(`${baseURL}/image`, body, config);
}

export const getImage = async (imageName) => {
    return await axios.get(`${baseURL}/image`, {
        params: {
            nameImage: imageName
        }
    })
}

export const uploadImageCloudinaryApi = async (file, token) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    }
    const body = {
        'image': file
    }
    return await axios.post(`${baseURL}/cloudinary/upload`, body, config);
}