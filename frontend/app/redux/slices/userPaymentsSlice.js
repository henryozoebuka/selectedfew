import { createSlice } from "@reduxjs/toolkit";

const userPaymentsSlice = createSlice({
    name: 'user-payments',
    initialState: [],
    reducers: {
        setUserPayments: (state, action) => {
            return action.payload;
        }
    }
});

export const {setUserPayments} = userPaymentsSlice.actions;
export default userPaymentsSlice.reducer;