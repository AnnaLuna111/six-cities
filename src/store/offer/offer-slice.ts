import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { OfferProps } from '../../types/offer-type';
import { RequestStatusType } from '../../types/state';
import { addBookmarkAction, loadOfferAction } from '../api-actions';

export type OfferType = {
  offerId: string;
  offer: OfferProps;
  offerLoadingStatus: RequestStatusType;
  hasOfferError: boolean;
}

const initialState: OfferType = {
  offerId: '',
  offer: {} as OfferProps,
  offerLoadingStatus: RequestStatus.Idle,
  hasOfferError: false
};

export const offer = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    setOfferId: (state, action: PayloadAction<string>) => {
      state.offerId = action.payload;
    },
    getOffer: (state, action: PayloadAction<OfferProps>) => {
      state.offer = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loadOfferAction.pending, (state) => {
        state.offerLoadingStatus = RequestStatus.Pending;
        state.hasOfferError = false;
      })
      .addCase(loadOfferAction.fulfilled, (state) => {
        state.offerLoadingStatus = RequestStatus.Fulfilled;
      })
      .addCase(loadOfferAction.rejected, (state) => {
        state.offerLoadingStatus = RequestStatus.Rejected;
        state.hasOfferError = true;
      })
      .addCase(addBookmarkAction.fulfilled, (state, action) => {
        const favoriteOffer = action.payload as OfferProps;
        if (state.offer) {
          state.offer.isFavorite = favoriteOffer.isFavorite;
        }
      });
  }
});

export const {setOfferId, getOffer} = offer.actions;
