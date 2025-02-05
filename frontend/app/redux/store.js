import {configureStore} from '@reduxjs/toolkit';
import colorsReducer from './slices/colorsSlice.js';
import textInputReducer from './slices/textInputSlice.js';
import buttonReducer from './slices/buttonSlice.js';
import buttonTextReducer from './slices/buttonTextSlice.js';

export default configureStore({
    reducer: {
        colors: colorsReducer,
        textInput: textInputReducer,
        button: buttonReducer,
        buttonText: buttonTextReducer,
    }
});