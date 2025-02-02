import { createSlice } from "@reduxjs/toolkit";
import { TEXTINPUTLIGHT, TEXTINPUTDARK } from "../../styles/styles.js";

const textInputSlice = createSlice({
    name: 'textInput',
    initialState: TEXTINPUTLIGHT,
    reducers: {
        setTextInputLight: (state) => {
            return TEXTINPUTLIGHT;
        },

        setTextInputDark: (state) => {
            return TEXTINPUTDARK;
        }
    }
});

export const { setTextInputLight, setTextInputDark } = textInputSlice.actions;
export default textInputSlice.reducer;