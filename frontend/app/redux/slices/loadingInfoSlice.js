import { createSlice } from '@reduxjs/toolkit';

const loadingInfoSlice = createSlice({
    name: 'loading-info',
    initialState: '',
    reducers: {
        setLoadingInfo: (state, action) => {
            return action.payload;
        }
    }
})

export const { setLoadingInfo } = loadingInfoSlice.actions;
export default loadingInfoSlice.reducer;