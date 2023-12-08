import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const selectOfferId = (state: State) => state[NameSpace.Offer].offerId;

export const selectOffer = (state: State) => state[NameSpace.Offer].offer;

export const selectOfferStatus = (state: State) => state[NameSpace.Offer].offerLoadingStatus;


export const selectOfferErrorStatus = (state: State) => state[NameSpace.Offer].hasOfferError;
