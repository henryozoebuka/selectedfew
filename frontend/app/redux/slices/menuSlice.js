import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
    name: 'menu',
    initialState: false,
    reducers: {
        toggleMenu: (state) => !state
    }
});

export const { toggleMenu } = menuSlice.actions;
export default menuSlice.reducer;