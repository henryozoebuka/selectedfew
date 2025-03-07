import { createSlice } from "@reduxjs/toolkit";

const adminTransactionHistorySlice = createSlice({
    name: 'admin-transaction-history',
    initialState: [],
    reducers: {
        setAdminTransactionHistory: (state, action) => {
            return action.payload;
        }
    }
});

export const {setAdminTransactionHistory} = adminTransactionHistorySlice.actions;
export default adminTransactionHistorySlice.reducer;