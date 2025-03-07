import { createSlice } from "@reduxjs/toolkit";

const announcementsSlice = createSlice({
    name: 'announcements',
    initialState: [],
    reducers: {
        setAnnouncements: (state, action) => {
            return action.payload;
        }
    }
});

export const {setAnnouncements} = announcementsSlice.actions;
export default announcementsSlice.reducer;