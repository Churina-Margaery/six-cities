import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortTypes } from '../../const';
import { MainState } from '../../types/state';

const initialState: MainState = {
  activeCityName: 'Paris',
  activeSort: SortTypes.Popular,
  savedPopularSort: []
};
