import { createSlice } from "@reduxjs/toolkit";
import { DARKBUTTON, LIGHTBUTTON } from "../../styles/styles.js";

const buttonSlice = createSlice({
    name : 'button',
    initialState : LIGHTBUTTON,
    reducers: {
        setLightButton: (state) => {
            return LIGHTBUTTON;
        },

        setDarkButton: (state) => {
            return DARKBUTTON;
        }
    }
});

export const {setLightButton, setDarkButton} = buttonSlice.actions;
export default buttonSlice.reducer;