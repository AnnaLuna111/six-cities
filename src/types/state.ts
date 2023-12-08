import { store } from '../store';
import { AuthorizationStatus, RequestStatus, SortOrders } from '../const';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AuthorizationStatusType = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];

export type RequestStatusType = typeof RequestStatus[keyof typeof RequestStatus];

export type SortOrderType = typeof SortOrders[keyof typeof SortOrders];

export type Token = string;

export type UserDataType = {
  email: string;
  password: string;
  token: Token;
}

export type AuthDataType = Omit<UserDataType, 'token'>;

export type FavoriteStatusType = {
  id: string;
  status: number;
}

export type LoginType = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

export type EmailType = string;
