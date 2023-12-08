import { CSSProperties } from 'react';

export const Api = {
  baseURL: 'https://13.design.pages.academy/six-cities',
  authTokenKey: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
} as const;

export const REQUEST_TIMEOUT = 5000;

export const APIRoute = {
  Offers: '/offers',
  Login: '/login',
  Logout: '/logout',
  Favorite: '/favorite',
  Reviews: '/comments'
};

export const AppRoute = {
  Main: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer',
  NotFound: '*'
} as const;

export const AuthorizationStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN',
} as const;

export const NameSpace = {
  Location: 'location',
  Offers: 'offers',
  CardList: 'cardlist',
  User: 'user',
  Reviews: 'reviews',
  Review: 'review',
  OffersNearby: 'offersNearby',
  Offer: 'offer',
  Favorites: 'favorites',
  Error: 'error'
} as const;

export const RequestStatus = {
  Idle: 'idle',
  Pending: 'pending',
  Fulfilled: 'fulfilled',
  Rejected: 'rejected'
} as const;

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export const SortOrders = {
  Popular: 'Popular',
  PriceLow: 'Price: low to high',
  PriceHigh: 'Price: high to low',
  Rated: 'Top rated first',
} as const;

export const CardDesign = {
  [AppRoute.Favorites]: {
    cardClass: 'favorites',
    cardInfoClass: 'favorites__card-info',
    cardWidth: '150',
    cardHeight: '110'
  },
  [AppRoute.Main]: {
    cardClass: 'cities',
    cardInfoClass: '',
    cardWidth: '260',
    cardHeight: '200'
  },
  [AppRoute.Offer]: {
    cardClass: 'near-places',
    cardInfoClass: '',
    cardWidth: '260',
    cardHeight: '200'
  }
} as const;

export const FormValidation = {
  MinLength: 50,
  MaxLength: 300,
  MinRating: 1,
  MaxRating: 5
} as const;

export const StarRatings = [
  {
    star: 5,
    description: 'perfect'
  },
  {
    star: 4,
    description: 'good'
  },
  {
    star: 3,
    description: 'not bad'
  },
  {
    star: 2,
    description: 'badly'
  },
  {
    star: 1,
    description: 'terribly'
  },
] as const;

export const URL_MARKER_DEFAULT = './img/pin.svg';

export const URL_MARKER_CURRENT = './img/pin-active.svg';

export const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '60px',
  height: '100vh'
};

export const spinnerSize = 300;

export const textStyle: CSSProperties = {
  fontSize: '46px',
};

export const plaseholderStyle: CSSProperties = {
  fontSize: '12px',
  marginTop: '-15px',
  marginBottom: '10px'
};

export const PASSWORD_REGEX = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$|(^$)/;

export const LogoSizes = {
  Width : {
    footer: '64',
    header: '81'
  },
  Height: {
    footer: '33',
    header: '41'
  }
} as const;

export const ErrorMessage = {
  UserUnauthorized: 'User is unauthorized',
  FailedLoadOffers: 'Failed to load offers',
  FailedLoadFavorites: 'Failed to load favorites',
  FailedLoadOffer: 'Failed to load offer',
  FailedLoadOffersNearby: 'Failed to load offers nearby',
  FailedLoadReviewsList: 'Failed to load reviews',
  FailedPostReview: 'Failed to post a review',
  FailedAddBookmark: 'Failed to change favorite status',
  FailedUserLogout: 'Failed to logout',
  FailedUserLogin: 'Failed to login',
} as const;

export const errorMessage: CSSProperties = {
  position: 'fixed',
  top: '30px',
  right: '30px',
  padding: '10px',
  backgroundColor: '#d96666',
  color: 'white',
  borderRadius: '5px',
};
