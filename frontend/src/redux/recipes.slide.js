import { createSlice } from "@reduxjs/toolkit";

const recipesSlide = createSlice({
    name: "recipes",
    initialState: {
        listOfCurrentUser: {
            data: [],
            isError: false,
            isSuccess: false,
            errorMessage: null
        },
        recipe: {
            data: null,
            isShowPopupUpdate: false,
            isShowPopupDelete: false
        }
    },
    reducers: {
        getListRecipeForCurrentUserSuccess: (state, action) => {
            state.listOfCurrentUser.data = action.payload;
            state.listOfCurrentUser.isSuccess = true;
        },
        getListRecipeForCurrentUserFail: (state, action) => {
            state.listOfCurrentUser.isError = true;
            state.listOfCurrentUser.errorMessage = action.payload
        },
        updateRecipeStart: (state, action) => {
            state.recipe.data = action.payload;
            state.recipe.isShowPopupUpdate = true;
        },
        updateRecipeEnd: (state) => {
            state.recipe.data = null;
            state.recipe.isShowPopupUpdate = false;
        },
        deleteRecipeStart: (state, action) => {
            state.recipe.data = action.payload;
            state.recipe.isShowPopupDelete = true;
        },
        deleteRecipeEnd: (state) => {
            state.recipe.data = null;
            state.recipe.isShowPopupDelete = false;
        }
    }
})

export default recipesSlide.reducer;
export const {
    deleteRecipeEnd,
    deleteRecipeStart,
    getListRecipeForCurrentUserFail,
    getListRecipeForCurrentUserSuccess,
    updateRecipeEnd,
    updateRecipeStart
} = recipesSlide.actions