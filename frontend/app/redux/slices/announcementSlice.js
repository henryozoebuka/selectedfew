import { createSlice } from "@reduxjs/toolkit";

const announcementSlice = createSlice({
    name: 'announcement',
    initialState: {},
    reducers: {
        setAnnouncement: (state, action) => {
            return action.payload;
        }
    }
});

export const {setAnnouncement} = announcementSlice.actions;
export default announcementSlice.reducer;