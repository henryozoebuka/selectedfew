import { createSlice } from "@reduxjs/toolkit";

const clubTransferSlice = createSlice({
    name: 'club-transfer',
    initialState: {},
    reducers: {
        setClubTransfer: (state, action) => {
            return action.payload;
        }
    }
});

export const {setClubTransfer} = clubTransferSlice.actions;
export default clubTransferSlice.reducer;