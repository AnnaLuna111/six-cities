import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from './../const';
import { cardlist } from './card-list/card-list-slice';
import { offer } from './offer/offer-slice';
import { offers } from './offers/offers-slice';
import { offersNearby } from './offers-nearby/offers-nearby-slice';
import { review } from './review/review-slice';
import { reviews } from './reviews/reviews-slice';
import { user } from './user/user-slice';
import { favorites } from './favorites/favorites-slice';
import { error } from './error/error-slice';

export const rootReducer = combineReducers({
  [NameSpace.CardList]: cardlist.reducer,
  [NameSpace.Offer]: offer.reducer,
  [NameSpace.Offers]: offers.reducer,
  [NameSpace.User]: user.reducer,
  [NameSpace.Review]: review.reducer,
  [NameSpace.OffersNearby]: offersNearby.reducer,
  [NameSpace.Reviews]: reviews.reducer,
  [NameSpace.Favorites]: favorites.reducer,
  [NameSpace.Error]: error.reducer,
});
