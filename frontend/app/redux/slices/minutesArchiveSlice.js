import { createSlice } from "@reduxjs/toolkit";

const minutesArchiveSlice = createSlice({
    name: 'minutes-archive',
    initialState: [],
    reducers: {
        setMinutesArchive: (state, action) => {
            return action.payload;
        }
    }
});

export const { setMinutesArchive } = minutesArchiveSlice.actions;
export default minutesArchiveSlice.reducer;