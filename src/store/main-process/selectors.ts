import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { SortTypes } from '../../const';

export const getActiveSort = (state: State): SortTypes => state[NameSpace.Main].activeSort;
