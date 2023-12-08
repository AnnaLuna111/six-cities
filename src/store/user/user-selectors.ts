import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectAuthorizationStatus = (state: State) => state[NameSpace.User].authorization;

export const selectEmail = (state: State) => state[NameSpace.User].email;
