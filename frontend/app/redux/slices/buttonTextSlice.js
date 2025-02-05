import { createSlice } from "@reduxjs/toolkit";
import { DARKBUTTONTEXT, LIGHTBUTTONTEXT } from "../../styles/styles.js";
import { setLightButton } from "./buttonSlice";

const buttonTextSlice = createSlice({
    name: 'buttonText',
    initialState: LIGHTBUTTONTEXT,
    reducers: {
        setLightButtonText: (state) => {
            return LIGHTBUTTONTEXT;
        },

        setDarkButtonText: (state) => {
            return DARKBUTTONTEXT;
        }
    }
});

export const {setLightButtonText, setDarkButtonText} = buttonTextSlice.actions;
export default buttonTextSlice.reducer;