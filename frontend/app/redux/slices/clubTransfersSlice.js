import { createSlice } from "@reduxjs/toolkit";

const clubTransfersSlice = createSlice({
    name: 'club-transfers',
    initialState: [],
    reducers: {
        setClubTransfers: (state, action) => {
            return action.payload;
        }
    }
});

export const {setClubTransfers} = clubTransfersSlice.actions;
export default clubTransfersSlice.reducer;