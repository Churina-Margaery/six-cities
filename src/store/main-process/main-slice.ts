import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortTypes } from '../../const';
import { MainState } from '../../types/state';
import { NameSpace } from '../../const';
import { changeCity } from '../data-process/data-slice';


const initialState: MainState = {
  activeSort: SortTypes.Popular,
};

export const mainSlice = createSlice({
  name: NameSpace.Main,
  initialState,
  reducers: {
    sortTypeChange: (state, action: PayloadAction<SortTypes>) => {
      state.activeSort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeCity, (state) => {
        state.activeSort = SortTypes.Popular;
      });
  },
});

export const { sortTypeChange } = mainSlice.actions;
export default mainSlice.reducer;
