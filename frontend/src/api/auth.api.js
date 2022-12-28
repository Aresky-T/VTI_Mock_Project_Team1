import axios from "axios";
import {
    signInStart,
    signInSuccess,
    signInError,
    signUpStart,
    signUpSuccess,
    signUpError
} from "../redux/auth.slice";

const baseURL = 'http://localhost:8080/api/v1';

export const signIn = async (formData, dispatch) => {
    dispatch(signInStart());
    try {
        const response = await axios.post(`${baseURL}/login`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        localStorage.setItem("token", JSON.stringify(response.data.token));
        dispatch(signInSuccess(response.data));
        console.log(response);
        console.log('Sign in successfully');
    } catch (err) {
        dispatch(signInError(err));
    }
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

export const signUp = async (bodyObj, dispatch, toast, setShowPopup) => {
    dispatch(signUpStart());
    console.log('calling sign up api...');
    await axios.post(`${baseURL}/users`, bodyObj)
        .then(response => {
            dispatch(signUpSuccess(response.data));
            console.log('response api: ', response);
        })
        .then(() => {
            console.log('show popup...');
            setShowPopup(true);
        })
        .catch((err) => {
            dispatch(signUpError('Sign up failed!'));
            toast('❌ Sign up failed, please try again!');
            console.log('error api: ', err);
        });
}