import { createSlice } from "@reduxjs/toolkit";

const minutesSlice = createSlice({
    name: 'minutes',
    initialState: {},
    reducers: {
        setMinutes: (state, action) => {
            return action.payload;
        }
    }
});

export const { setMinutes } = minutesSlice.actions;
export default minutesSlice.reducer;