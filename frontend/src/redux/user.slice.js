import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            data: null,
            avatarUrl: null,
            isError: false,
            errMessage: null,
        }
    },
    reducers: {
        getProfileStart: (state) => {
            state.user.isError = false;
            state.user.errMessage = null;
        },
        getProfileSuccess: (state, action) => {
            state.user.data = action.payload;
        },
        getProfileError: (state, action) => {
            state.user.isError = true;
            state.user.errMessage = action.payload;
        },
        updateProfileStart: (state) => {
            state.user.isError = false;
            state.user.errMessage = null;
        },
        updateProfileSuccess: (state, action) => {
            state.user.data = action.payload;
        },
        updateProfileError: (state, action) => {
            state.user.isError = true;
            state.user.errMessage = action.payload;
        },
        updateAvatarStart: (state) => {
            state.user.isError = false;
            state.user.errMessage = null;
        },
        updateAvatarSuccess: (state, action) => {
            state.user.avatarUrl = action.payload;
        },
        updateAvatarError: (state, action) => {
            state.user.isError = true;
            state.user.errMessage = action.payload;
        },
        setAvatarForShow: (state, action) => {
            state.user.avatarUrl = action.payload;
        },
        setNullAvatar: (state) => {
            state.user.avatarUrl = null
        }
    }
})

export const {
    getProfileError,
    getProfileStart,
    getProfileSuccess,
    setAvatarForShow,
    setNullAvatar,
    updateAvatarError,
    updateAvatarStart,
    updateAvatarSuccess,
    updateProfileError,
    updateProfileStart,
    updateProfileSuccess
} = userSlice.actions;

export default userSlice.reducer;