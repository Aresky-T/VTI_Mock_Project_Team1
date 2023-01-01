import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        signIn: {
            currentUser: JSON.parse(localStorage.getItem('userLoggedIn')),
            isLoading: false,
            isError: false,
            signInErrorMessage: null
        },
        signUp: {
            isLoading: false,
            isSuccess: false,
            isError: false,
            signUpSuccessMessage: null,
            signUpErrorMessage: null
        }
    }, reducers: {
        signInStart: state => {
            state.signIn.isLoading = true;
        },
        signInSuccess: (state, action) => {
            state.signIn.isLoading = false;
            state.signIn.isError = false;
            state.signIn.signInErrorMessage = null;
            state.signIn.currentUser = action.payload;
        },
        signInError: (state, action) => {
            state.signIn.isLoading = false;
            state.signIn.isError = true;
            state.signIn.signInErrorMessage = action.payload;
        },
        signUpStart: state => {
            state.signUp.isLoading = true;
        },
        signUpSuccess: (state, action) => {
            state.signUp.isLoading = false;
            state.signUp.isError = false;
            state.signUp.signUpErrorMessage = null;
            state.signUp.isSuccess = true;
            state.signUp.signUpSuccessMessage = action.payload;
        },
        signUpError: (state, action) => {
            state.signUp.isLoading = false;
            state.signUp.isSuccess = false;
            state.signUp.isError = true;
            state.signUp.signUpSuccessMessage = null;
            state.signUp.signUpErrorMessage = action.payload;
        },
        signOut: state => {
            state.signIn.currentUser = null;
            state.signIn.isLoading = false;
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
    signInStart,
    signInSuccess,
    signInError,
    signUpStart,
    signUpSuccess,
    signUpError,
    signOut,
    clearRedux
} = authSlice.actions;

export default authSlice.reducer;