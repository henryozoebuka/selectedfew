import { createSlice } from '@reduxjs/toolkit';

const failureSlice = createSlice({
    name: 'failure',
    initialState: '',
    reducers: {
        setFailure: (state, action) => {
            return action.payload;
        }
    }
})

export const { setFailure } = failureSlice.actions;
export default failureSlice.reducer;