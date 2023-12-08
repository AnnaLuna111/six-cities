import { createSlice } from '@reduxjs/toolkit';
import { OfferProps } from '../../types/offer-type';
import { NameSpace, RequestStatus } from '../../const';
import { addBookmarkAction, loadOffersAction, logoutUserAction } from '../api-actions';
import { RequestStatusType } from '../../types/state';

type OffersType = {
  offers: OfferProps[];
  offersLoadingStatus: RequestStatusType;
  hasDataError: boolean;
}

const initialState: OffersType = {
  offers: [],
  offersLoadingStatus: RequestStatus.Idle,
  hasDataError: false
};

export const offers = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadOffersAction.pending, (state) => {
        state.offersLoadingStatus = RequestStatus.Pending;
        state.hasDataError = false;
      })
      .addCase(loadOffersAction.fulfilled, (state, action) => {
        state.offersLoadingStatus = RequestStatus.Fulfilled;
        state.offers = action.payload as OfferProps[];
      })
      .addCase(loadOffersAction.rejected, (state) => {
        state.offersLoadingStatus = RequestStatus.Rejected;
        state.hasDataError = true;
      })
      .addCase(logoutUserAction.fulfilled, (state) => {
        state.offers.forEach((offer) => {
          if (offer.isFavorite) {
            offer.isFavorite = false;
          }
        });
      })
      .addCase(addBookmarkAction.fulfilled, (state, action) => {
        const favoriteOffer = action.payload as OfferProps;
        state.offers.forEach((offer) => {
          if (offer.id === favoriteOffer.id) {
            offer.isFavorite = favoriteOffer.isFavorite;
          }
        });
      });
  }
});
