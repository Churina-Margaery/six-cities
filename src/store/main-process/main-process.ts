import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortTypes } from '../../const';
import { MainState } from '../../types/state';
import { NameSpace } from '../../const';


const initialState: MainState = {
  activeSort: SortTypes.Popular,
};

export const mainSlice = createSlice({
  name: NameSpace.Main,
  initialState,
  reducers: {
    changeCity: (state) => {
      state.activeSort = SortTypes.Popular;
    },
    sortTypeChange: (state, action: PayloadAction<SortTypes>) => {
      state.activeSort = action.payload;
    },
  },
});

export const { changeCity, sortTypeChange } = mainSlice.actions;
export default mainSlice.reducer;
