import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {},
    reducers: {
        setPayment: (state, action) => {
            return action.payload;
        }
    }
});

export const {setPayment} = paymentSlice.actions;
export default paymentSlice.reducer;