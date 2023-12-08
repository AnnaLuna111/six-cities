import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectError = (state: State) => state[NameSpace.Error].error;
