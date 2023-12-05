import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    states: null,
}

export const statesSlice = createSlice({
    name: 'states',
    initialState,
    reducers: {
        states: (state, action) => {
            state.states = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { states } = statesSlice.actions

export default statesSlice.reducer