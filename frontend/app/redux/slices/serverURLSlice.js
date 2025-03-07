import {createSlice} from '@reduxjs/toolkit';

const serverURLSlice = createSlice({
    name: 'serverURL',
    initialState: 'test'
});

export default serverURLSlice.reducer;