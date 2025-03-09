import { createSlice } from '@reduxjs/toolkit';

const isLoggedInSlice = createSlice({
    name: 'auth',
    initialState: false,
    reducers: {
        setIsLoggedIn: () => true,  // Directly returning the new state
        setIsLoggedOut: () => false // Directly returning the new state
    }
});

export const { setIsLoggedIn, setIsLoggedOut } = isLoggedInSlice.actions;
export default isLoggedInSlice.reducer;