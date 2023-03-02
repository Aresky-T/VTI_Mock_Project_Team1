import axios from "axios";
import {
    signUpSuccess,
    signUpError,
    signOut
} from "../redux/auth.slice";
import { offLoading, onLoading } from "../redux/loading.slice";
import { toastStyle } from "../configs/toastStyleConfig";

const baseURL = 'http://localhost:8080/api/v1';

// export const signInUser = async (formData, dispatch) => {
//     dispatch(onLoading());
//     try {
//         const response = await axios.post(`${baseURL}/login`, formData, {
//             headers: {
//                 "Content-Type": "multipart/form-data"
//             }
//         });
//         return response.data;
//     } catch (err) {
//         dispatch(signInError("Username or password invalid. Please try again!"));
//         dispatch(offLoading());
//     }
// }

export const signInUserApi = async (formData, dispatch) => {
    dispatch(onLoading());
    return await axios.post(`${baseURL}/login`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

// export const signUp = async (bodyObj, dispatch, toast, setShowPopup) => {
//     dispatch(signUpStart());
//     console.log('calling sign up api...');
//     try {
//         const response = await axios.post(`${baseURL}/users`, bodyObj);
//         dispatch(signUpSuccess(response.data));
//         console.log(response);
//         setShowPopup(true);
//     } catch (err) {
//         dispatch(signUpError('Sign up failed!'));
//         toast('❌ Sign up failed, please try again!');
//     }
// }

export const signUpUserApi = async (bodyObj, dispatch, toast, setShowPopup) => {
    dispatch(onLoading());
    await axios.post(`${baseURL}/users`, bodyObj)
        .then(response => {
            dispatch(signUpSuccess(response.data));
            dispatch(offLoading());
        })
        .then(() => {
            setShowPopup(true);
        })
        .catch((err) => {
            setTimeout(() => dispatch(offLoading()), 1000)
            setTimeout(() => toast.error('Sign up failed, please try again!', toastStyle), 1100)
            dispatch(signUpError('Sign up failed!'));
        });
}

export const signOutUser = (dispatch, navigate) => {
    localStorage.clear();
    dispatch(signOut());
    navigate("/");
}