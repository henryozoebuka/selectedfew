import { createSlice } from "@reduxjs/toolkit";

const paymentApprovalSlice = createSlice({
    name: 'payment-approval',
    initialState: {},
    reducers: {
        setPaymentApproval: (state, action) => {
            return action.payload;
        }
    }
});

export const {setPaymentApproval} = paymentApprovalSlice.actions;
export default paymentApprovalSlice.reducer;