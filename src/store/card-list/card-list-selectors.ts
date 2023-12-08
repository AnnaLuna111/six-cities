import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectLocation = (state: State) => state[NameSpace.CardList].location;

export const selectSort = (state: State) => state[NameSpace.CardList].sort;
