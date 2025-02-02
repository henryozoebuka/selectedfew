import {configureStore} from '@reduxjs/toolkit';
import colorsReducer from './slices/colorsSlice.js';
import textInputReducer from './slices/textInputSlice.js';

export default configureStore({
    reducer: {
        colors: colorsReducer,
        textInput: textInputReducer,
    }
});