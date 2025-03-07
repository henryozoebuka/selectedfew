import { createSlice } from "@reduxjs/toolkit";

const paymentsSlice = createSlice({
    name: 'payments',
    initialState: [],
    reducers: {
        setPayments: (state, action) => {
            return action.payload;
        }
    }
});

export const {setPayments} = paymentsSlice.actions;
export default paymentsSlice.reducer;