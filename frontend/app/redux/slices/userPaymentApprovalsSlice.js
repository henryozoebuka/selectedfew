import { createSlice } from "@reduxjs/toolkit";

const userPaymentApprovalsSlice = createSlice({
    name: 'user-payment-approvals',
    initialState: [],
    reducers: {
        setUserPaymentApprovals: (state, action) => {
            return action.payload;
        }
    }
});

export const {setUserPaymentApprovals} = userPaymentApprovalsSlice.actions;
export default userPaymentApprovalsSlice.reducer;