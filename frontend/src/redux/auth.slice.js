import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        signIn: {
            currentUser: JSON.parse(localStorage.getItem('userLoggedIn')),
            isError: false,
            signInErrorMessage: null,
            isShowPopup: false
        },
        signUp: {
            isSuccess: false,
            isError: false,
            signUpSuccessMessage: null,
            signUpErrorMessage: null
        }
    }, reducers: {
        signInSuccess: (state, action) => {
            state.signIn.isError = false;
            state.signIn.signInErrorMessage = null;
            state.signIn.currentUser = action.payload;
        },
        signInError: (state, action) => {
            state.signIn.isError = true;
            state.signIn.signInErrorMessage = action.payload;
        },
        showSignInPopup: (state) => {
            state.signIn.isShowPopup = true
        },
        hiddenSignInPopup: (state) => {
            state.signIn.isShowPopup = false
        },
        signUpStart: (state) => {
            state.signUp.isError = false;
            state.signUp.signUpErrorMessage = null;
        },
        signUpSuccess: (state, action) => {
            state.signUp.isSuccess = true;
            state.signUp.signUpSuccessMessage = action.payload;
        },
        signUpError: (state, action) => {
            state.signUp.isSuccess = false;
            state.signUp.isError = true;
            state.signUp.signUpSuccessMessage = null;
            state.signUp.signUpErrorMessage = action.payload;
        },
        signOut: state => {
            state.signIn.currentUser = null;
            state.signIn.isError = false;
            state.signUp.signUpSuccessMessage = null;
            state.signIn.signInErrorMessage = null;
        },
        clearRedux: (state) => {
            state.signIn.signInErrorMessage = null;
            state.signUp.signUpErrorMessage = null;
        }
    }
});

export const {
    clearRedux,
    hiddenSignInPopup,
    showSignInPopup,
    signInError,
    signInSuccess,
    signOut,
    signUpError,
    signUpStart,
    signUpSuccess
} = authSlice.actions;

export default authSlice.reducer;