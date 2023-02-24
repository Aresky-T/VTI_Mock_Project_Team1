import { createSlice } from "@reduxjs/toolkit";

const recipesSlide = createSlice({
    name: "recipes",
    initialState: {
        listOfCurrentUser: {
            data: [],
            isLoading: false,
            isError: false,
            isSuccess: false,
            errorMessage: null
        },
        recipe: {
            data: null,
            isShowPopup: false,
        }
    },
    reducers: {
        getListForCurrentUserStart: (state) => {
            state.listOfCurrentUser.isLoading = true;
            state.listOfCurrentUser.isSuccess = false;
            state.listOfCurrentUser.isError = false;;
            state.listOfCurrentUser.errorMessage = null;
        },
        getListForCurrentUserSuccess: (state, action) => {
            state.listOfCurrentUser.data = action.payload;
            state.listOfCurrentUser.isLoading = false;
            state.listOfCurrentUser.isSuccess = true;
        },
        getListForCurrentUserFail: (state, action) => {
            state.listOfCurrentUser.isLoading = false;
            state.listOfCurrentUser.isError = true;
            state.listOfCurrentUser.errorMessage = action.payload
        },
        updateRecipe: (state, action) => {
            state.recipe.data = action.payload;
        },
        showUpdateRecipePopup: (state) => {
            state.recipe.isShowPopup = true;
        },
        hiddenUpdateRecipePopup: (state) => {
            state.recipe.isShowPopup = false;
            state.recipe.data = null;
        }
    }
})

export default recipesSlide.reducer;
export const {
    getListForCurrentUserStart,
    getListForCurrentUserSuccess,
    getListForCurrentUserFail,
    updateRecipe,
    showUpdateRecipePopup,
    hiddenUpdateRecipePopup
} = recipesSlide.actions