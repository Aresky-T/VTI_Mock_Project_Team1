import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            data: null,
            avatarUrl: null,
            isSuccess: false,
            isLoading: false,
            isError: false,
            errMessage: null,
        }
    },
    reducers: {
        getProfileStart: (state) => {
            state.user.isLoading = true;
            state.user.isSuccess = false;
            state.user.isError = false;
            state.user.errMessage = null;
        },
        getProfileSuccess: (state, action) => {
            state.user.isLoading = false;
            state.user.isSuccess = true;
            state.user.data = action.payload;
        },
        getProfileError: (state, action) => {
            state.user.isError = true;
            state.user.isLoading = false;
            state.user.errMessage = action.payload;
        },
        updateProfileStart: (state) => {
            state.user.isLoading = true;
            state.user.isSuccess = false;
            state.user.isError = false;
            state.user.errMessage = null;
        },
        updateProfileSuccess: (state, action) => {
            state.user.isLoading = false;
            state.user.isSuccess = true;
            state.user.data = action.payload;
        },
        updateProfileError: (state, action) => {
            state.user.isError = true;
            state.user.isLoading = false;
            state.user.errMessage = action.payload;
        },
        uploadImageToCloudStart: (state) => {
            state.user.isLoading = true;
            state.user.isSuccess = false;
            state.user.isError = false;
            state.user.errMessage = null;
        },
        uploadImageToCloudSuccess: (state) => {
            state.user.isLoading = false;
            state.user.isSuccess = true;
        },
        getAvatar: (state, action) => {
            state.user.isLoading = false;
            state.user.avatarUrl = action.payload;
            state.user.isError = false;
            state.user.errMessage = null;
        },
        updateAvatarStart: (state) => {
            state.user.isLoading = true;
            state.user.isSuccess = false;
            state.user.isError = false;
            state.user.errMessage = null;
        },
        updateAvatarSuccess: (state, action) => {
            state.user.isLoading = false;
            state.user.isSuccess = true;
            state.user.avatarUrl = action.payload;
        },
        updateAvatarError: (state, action) => {
            state.user.isLoading = false;
            state.user.isError = true;
            state.user.errMessage = action.payload;
        }
    }
})

export const {
    getProfileStart,
    getProfileSuccess,
    getProfileError,
    updateProfileStart, 
    updateProfileSuccess,
    updateProfileError,
    uploadImageToCloudStart,
    uploadImageToCloudSuccess,
    getAvatar,
    updateAvatarStart,
    updateAvatarSuccess,
    updateAvatarError
} = userSlice.actions;

export default userSlice.reducer;