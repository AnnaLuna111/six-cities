import { OfferProps } from '../../types/offer-type';
import { RequestStatusType } from '../../types/state';
import { NameSpace, RequestStatus } from '../../const';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addBookmarkAction, loadOffersNearbyAction } from '../api-actions';

export type OffersNearbyType = {
  offers: OfferProps[];
  nearbyLoadingStatus: RequestStatusType;
  hasNearbyError: boolean;
}

const initialState: OffersNearbyType = {
  offers: [],
  nearbyLoadingStatus: RequestStatus.Idle,
  hasNearbyError: false
};

export const offersNearby = createSlice({
  name: NameSpace.OffersNearby,
  initialState,
  reducers: {
    getOffersNearby: (state, action: PayloadAction<OfferProps[]>) => {
      state.offers = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadOffersNearbyAction.pending, (state) => {
        state.nearbyLoadingStatus = RequestStatus.Pending;
        state.hasNearbyError = false;
      })
      .addCase(loadOffersNearbyAction.fulfilled, (state) => {
        state.nearbyLoadingStatus = RequestStatus.Fulfilled;
      })
      .addCase(loadOffersNearbyAction.rejected, (state) => {
        state.nearbyLoadingStatus = RequestStatus.Rejected;
        state.hasNearbyError = true;
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

export const {getOffersNearby} = offersNearby.actions;
