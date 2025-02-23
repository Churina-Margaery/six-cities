import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataSlice } from './data-process/data-slice';
import { mainSlice } from './main-process/main-slice';
import { userSlice } from './user-process/user-slice';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataSlice.reducer,
  [NameSpace.Main]: mainSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
});
