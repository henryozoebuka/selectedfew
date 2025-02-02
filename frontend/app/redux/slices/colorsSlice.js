import { createSlice } from "@reduxjs/toolkit";
import { LIGHTCOLORS, DARKCOLORS } from "../../styles/styles.js";

const colorsSlice = createSlice({
    name: 'colors',
    initialState: LIGHTCOLORS,
    reducers: {
        setLightMode: (state) => {
            return LIGHTCOLORS;
        },

        setDarkMode: (state) => {
            return DARKCOLORS;
        }
    }
});

export const { setLightMode, setDarkMode } = colorsSlice.actions;
export default colorsSlice.reducer;