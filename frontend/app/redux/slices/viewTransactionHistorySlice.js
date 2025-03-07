import { createSlice } from "@reduxjs/toolkit";

const viewTransactionHistorySlice = createSlice({
    name: 'view-transaction-history',
    initialState: {},
    reducers: {
        setViewTransactionHistory: (state, action) => {
            return action.payload;
        }
    }
});

export const {setViewTransactionHistory} = viewTransactionHistorySlice.actions;
export default viewTransactionHistorySlice.reducer;