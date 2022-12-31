import { createSlice } from "@reduxjs/toolkit";

const dropdownSlice = createSlice({
    name: "dropdown",
    initialState: {
        height: 0
    },
    reducers: {
        toggleDropdown: (state, action) => {
            state.height = action.payload
        }
    }
})

export const {toggleDropdown} = dropdownSlice.actions;
export default dropdownSlice.reducer;