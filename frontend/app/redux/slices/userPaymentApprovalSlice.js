import { createSlice } from "@reduxjs/toolkit";

const userPaymentApprovalSlice = createSlice({
    name: 'user-payment-approval',
    initialState: {},
    reducers: {
        setUserPaymentApproval: (state, action) => {
            return action.payload;
        }
    }
});

export const {setUserPaymentApproval} = userPaymentApprovalSlice.actions;
export default userPaymentApprovalSlice.reducer;