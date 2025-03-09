import {createSlice} from '@reduxjs/toolkit';

const serverURLSlice = createSlice({
    name: 'serverURL',
    
    initialState: 'http://192.168.116.83:3001'
});

export default serverURLSlice.reducer;