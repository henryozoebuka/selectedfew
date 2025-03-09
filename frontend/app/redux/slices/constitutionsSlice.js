import { createSlice } from "@reduxjs/toolkit";

const constitutionsSlice = createSlice({
    name: 'constitutions',
    initialState: [],
    reducers: {
        setConstitutions: (state, action) => {
            return action.payload;
        }
    }
});

export const {setConstitutions} = constitutionsSlice.actions;
export default constitutionsSlice.reducer;