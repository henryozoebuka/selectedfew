import { createSlice } from "@reduxjs/toolkit";

const paymentApprovalsSlice = createSlice({
    name: 'payment-approvals',
    initialState: [],
    reducers: {
        setPaymentApprovals: (state, action) => {
            return action.payload;
        }
    }
});

export const {setPaymentApprovals} = paymentApprovalsSlice.actions;
export default paymentApprovalsSlice.reducer;