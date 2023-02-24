import { createSlice } from "@reduxjs/toolkit";

const timeSlice = createSlice({
    name: "time",
    initialState: {
        value: null
    },
    reducers: {
        updateTime: (state) => {
            state.value = new Date();
        }
    }
})

export const {updateTime} = timeSlice.actions;
export default timeSlice.reducer;
