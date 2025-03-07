import { createSlice } from "@reduxjs/toolkit";

const transactionHistorySlice = createSlice({
    name: 'transaction-history',
    initialState: [],
    reducers: {
        setTransactionHistory: (state, action) => {
            return action.payload;
        }
    }
});

export const {setTransactionHistory} = transactionHistorySlice.actions;
export default transactionHistorySlice.reducer;