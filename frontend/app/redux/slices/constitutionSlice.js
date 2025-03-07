import { createSlice } from "@reduxjs/toolkit";

const constitutionSlice = createSlice({
    name: 'constitution',
    initialState: {},
    reducers: {
        setConstitution: (state, action) => {
            return action.payload;
        }
    }
});

export const {setConstitution} = constitutionSlice.actions;
export default constitutionSlice.reducer;