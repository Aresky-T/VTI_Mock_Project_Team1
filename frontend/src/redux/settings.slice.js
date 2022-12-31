import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        currentListIndex: JSON.parse(localStorage.getItem('settingUser1')),
        settings: {
            "--background-color": "#fff",
            "--background-light": "#fff",
            "--primary-color": "rgb(255, 0, 86)",
            "--shadow-color": "rgba(0,0,0,0.2)",
            "--text-color": "#0A0A0A",
            "--text-light": "#575757",
            "--font-size": "16px",
            "--animation-speed": 1
        },
        themes: {
            themes: [
                {
                    "--background-color": "#fff",
                    "--background-light": "#fff",
                    "--shadow-color": "rgba(0,0,0,0.2)",
                    "--text-color": "#0A0A0A",
                    "--text-light": "#575757"
                },
                {
                    "--background-color": "rgb(29, 29, 29)",
                    "--background-light": "rgb(77, 77, 77)",
                    "--shadow-color": "rgba(0,0,0,0.2)",
                    "--text-color": "#ffffff",
                    "--text-light": "#eceaea",
                }
            ]
        },
        primaryColors: {
            primaryColors: [
                "rgb(255, 0, 86)",
                "rgb(33, 150, 243)",
                "rgb(255, 193, 7)",
                "rgb(0, 200, 83)",
                "rgb(156, 39, 176)"
            ]
        },
        fontSizes: {
            fontSizes: [
                {
                    title: "Small",
                    value: "12px"
                },
                {
                    title: "Medium",
                    value: "16px"
                },
                {
                    title: "Large",
                    value: "20px"
                }
            ]
        },
        animationSpeeds: {
            animationSpeeds: [
                {
                    title: "Slow",
                    value: 2
                },
                {
                    title: "Medium",
                    value: 1
                },
                {
                    title: "Fast",
                    value: .5
                }
            ]
        }
    },
    reducers: {
        changeSettings: (state, action) => {
            state.settings = action.payload;
        },
        changeCurrentList: (state, action) => {
            state.currentListIndex = action.payload;
        }
    }
});

export const { changeSettings, changeCurrentList } = settingsSlice.actions;
export default settingsSlice.reducer;