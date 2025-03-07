import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
    name: 'events',
    initialState: [],
    reducers: {
        setEvents: (state, action) => {
            return action.payload;
        }
    }
});

export const {setEvents} = eventsSlice.actions;
export default eventsSlice.reducer;