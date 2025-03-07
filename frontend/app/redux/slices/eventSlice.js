import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
    name: 'event',
    initialState: {},
    reducers: {
        setEvent: (state, action) => {
            return action.payload;
        }
    }
});

export const {setEvent} = eventSlice.actions;
export default eventSlice.reducer;