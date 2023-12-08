import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectOffersNearby = (state: State) => state[NameSpace.OffersNearby].offers;

export const selectNearbyStatus = (state: State) => state[NameSpace.OffersNearby].nearbyLoadingStatus;

export const selectNearbyErrorStatus = (state: State) => state[NameSpace.OffersNearby].hasNearbyError;
