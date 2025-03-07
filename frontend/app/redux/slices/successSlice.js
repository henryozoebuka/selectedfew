import {createSlice} from '@reduxjs/toolkit';

const successSlice = createSlice({
    name: 'success',
    initialState: '',
    reducers: {
        setSuccess: (state, action) => {
            return action.payload;
        }
    }
})

export const {setSuccess} = successSlice.actions;
export default successSlice.reducer;