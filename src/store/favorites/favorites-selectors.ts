import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectFavorites = (state: State) => state[NameSpace.Favorites].offers;

export const selectFavortiesStatus = (state: State) => state[NameSpace.Favorites].favoritesLoadingStatus;

export const selectFavoritesErrorStatus = (state: State) => state[NameSpace.Favorites].hasFavoritesError;
