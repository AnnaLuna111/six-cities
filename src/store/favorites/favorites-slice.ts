import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { OfferProps } from '../../types/offer-type';
import { RequestStatusType } from '../../types/state';
import { addBookmarkAction, loadFavoritesAction, logoutUserAction } from '../api-actions';

type FavoritesType = {
  offers: OfferProps[];
  favoritesLoadingStatus: RequestStatusType;
  hasFavoritesError: boolean;
}

const initialState: FavoritesType = {
  offers: [],
  favoritesLoadingStatus: RequestStatus.Idle,
  hasFavoritesError: false
};

export const favorites = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadFavoritesAction.pending, (state) => {
        state.favoritesLoadingStatus = RequestStatus.Pending;
      })
      .addCase(loadFavoritesAction.fulfilled, (state, action) => {
        state.favoritesLoadingStatus = RequestStatus.Fulfilled;
        state.offers = action.payload as OfferProps[];
      })
      .addCase(loadFavoritesAction.rejected, (state) => {
        state.favoritesLoadingStatus = RequestStatus.Rejected;
        state.hasFavoritesError = true;
      })
      .addCase(logoutUserAction.fulfilled, (state) =>{
        state.offers = [];
      })
      .addCase(addBookmarkAction.fulfilled, (state, action) => {
        const favoriteOffer = action.payload as OfferProps;
        if (favoriteOffer.isFavorite) {
          state.offers.push(action.payload as OfferProps);
        } else {
          state.offers.filter((offer) => offer.id !== favoriteOffer.id);
        }
      });
  }
});
