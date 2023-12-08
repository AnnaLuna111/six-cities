import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectOffers = (state: State) => state[NameSpace.Offers].offers;

export const selectOffersLoadingStatus = (state: State) => state[NameSpace.Offers].offersLoadingStatus;

export const selectDataErrorStatus = (state: State) => state[NameSpace.Offers].hasDataError;
