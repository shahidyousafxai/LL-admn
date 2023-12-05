import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  previewData: {},
};

export const previewSlice = createSlice({
  name: 'previewReducer',
  initialState,
  reducers: {
    previewReducer: (state, action) => {
      state.previewData = action.payload;
    },
  },
});

export const { previewReducer } = previewSlice.actions;
export default previewSlice.reducer;
