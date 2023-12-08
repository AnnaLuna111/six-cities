import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AuthDataType, FavoriteStatusType, LoginType, State, UserDataType } from '../types/state';
import { OfferProps } from '../types/offer-type';
import { APIRoute, AuthorizationStatus, ErrorMessage, REQUEST_TIMEOUT } from '../const';
import { AxiosInstance } from 'axios';
import { dropToken, saveToken } from '../services/token';
import { NewReview, ReviewProps } from '../types/review-type';
import { getOffer } from './offer/offer-slice';
import { addReview, getReviews } from './reviews/reviews-slice';
import { getOffersNearby } from './offers-nearby/offers-nearby-slice';
import { setEmail, updateAuthorizationStatus } from './user/user-slice';
import { setError } from './error/error-slice';

export const clearErrorAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  }
>(
  'clearErrorAction',
  (errorMessage, {dispatch}) => {
    setError(errorMessage);
    setTimeout(
      () => dispatch(setError(null)),
      REQUEST_TIMEOUT,
    );
  },
);

export const loadOffersAction = createAsyncThunk<OfferProps[] | undefined, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'loadOffersAction',
  async (_arg, {dispatch, extra: axiosApi}) => {
    try {
      const {data} = await axiosApi.get<OfferProps[]>(APIRoute.Offers);
      return data;
    } catch {
      dispatch(clearErrorAction(ErrorMessage.FailedLoadOffers));
    }
  },
);

export const loadOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }
>
(
  'loadOfferAction',
  async (offerId, {dispatch, extra: axiosApi}) => {
    try {
      const {data} = await axiosApi.get<OfferProps>(`${APIRoute.Offers}/${offerId}`);
      dispatch(getOffer(data));
    } catch {
      dispatch(clearErrorAction(ErrorMessage.FailedLoadOffer));
    }
  },
);

export const loadReviewsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }
>
(
  'loadReviewsAction',
  async (offerId, {dispatch, extra: axiosApi}) => {
    try {
      const {data} = await axiosApi.get<ReviewProps[]>(`${APIRoute.Reviews}/${offerId}`);
      dispatch(getReviews(data));
    } catch {
      dispatch(clearErrorAction(ErrorMessage.FailedLoadReviewsList));
    }
  },
);

export const postReviewAction = createAsyncThunk<void, NewReview, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}
>(
  'sendReview',
  async ({id, comment, rating}, {dispatch, extra: axiosApi}) => {
    try {
      const {data} = await axiosApi.post<ReviewProps>(`${APIRoute.Reviews}/${id}`, {comment, rating});
      dispatch(addReview(data));
    } catch {
      dispatch(clearErrorAction(ErrorMessage.FailedPostReview));
    } throw Error;
  }
);

export const loadOffersNearbyAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }
>
(
  'loadOffersNearbyAction',
  async (offerId, {dispatch, extra: axiosApi}) => {
    try {
      const {data} = await axiosApi.get<OfferProps[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      dispatch(getOffersNearby(data.slice(0,3)));
    } catch {
      dispatch(clearErrorAction(ErrorMessage.FailedLoadOffersNearby));
    }
  },
);

export const loadFavoritesAction = createAsyncThunk<OfferProps[] | undefined, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }
>
(
  'loadFavoritesAction',
  async (_arg, {dispatch, extra: axiosApi}) => {
    try {
      const {data} = await axiosApi.get<OfferProps[]>(APIRoute.Favorite);
      return data;
    } catch {
      dispatch(clearErrorAction(ErrorMessage.FailedLoadFavorites));
    }
  },
);

export const addBookmarkAction = createAsyncThunk<OfferProps | undefined, FavoriteStatusType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }
>
(
  'addBookmarkAction',
  async ({id, status}, { dispatch, extra: axiosApi}) => {
    try {
      const {data} = await axiosApi.post<OfferProps>(`${APIRoute.Favorite}/${id}/${status}`);
      return data;
    } catch {
      dispatch(clearErrorAction(ErrorMessage.FailedAddBookmark));
    }
  },
);

export const updateAuthStatusAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }
>
(
  'user/updateAuthotization',
  async (_arg, {dispatch, extra: axiosApi}) => {
    try {
      const {data} = await axiosApi.get<LoginType>(APIRoute.Login);
      dispatch(updateAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setEmail(data.email));
    } catch {
      dispatch(updateAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(clearErrorAction(ErrorMessage.UserUnauthorized));
    }
  },
);

export const loginUserAction = createAsyncThunk<void, AuthDataType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }
>
(
  'user/login',
  async ({email, password}, {dispatch, extra: axiosApi}) => {
    try {
      const {data: {token}} = await axiosApi.post<UserDataType>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(updateAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setEmail(email));
      dispatch(loadOffersAction());
      dispatch(loadFavoritesAction());
    } catch {
      dispatch(updateAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(clearErrorAction(ErrorMessage.FailedUserLogin));
    }
  },
);

export const logoutUserAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(updateAuthorizationStatus(AuthorizationStatus.NoAuth));
    } catch {
      dispatch(clearErrorAction(ErrorMessage.FailedUserLogout));
    }
  },
);
