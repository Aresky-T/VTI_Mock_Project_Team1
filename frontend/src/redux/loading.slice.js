import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        isLoading: null
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        offLoading: (state) => {
            state.isLoading = false;
        }

    }
})

export const { onLoading, offLoading } = loadingSlice.actions;
export default loadingSlice.reducer;