import { FormValidation, PASSWORD_REGEX, RequestStatus, SortOrders } from './const';
import { OfferProps } from './types/offer-type';
import { RequestStatusType, SortOrderType } from './types/state';

export const capitalize = (string: string) => {
  if (!string) {
    return string;
  }

  return string[0].toUpperCase() + string.slice(1);
};

export const getPlural = (noun: string, count: number) => count > 1 ? `${noun}s` : noun;

export const getRatingWidth = (rating: number | null | undefined): string => {
  const correctRating = rating ?? 0;
  if (correctRating >= 0 && correctRating <= 5) {
    return `${Math.round(correctRating) * 20}%`;
  }
  return '0%';
};

export const sortOffers = (offers: OfferProps[], sortType: SortOrderType): OfferProps[] => {
  switch (sortType) {
    case SortOrders.PriceLow:
      return offers.slice().sort((a, b) => a.price - b.price);
    case SortOrders.PriceHigh:
      return offers.slice().sort((a, b) => b.price - a.price);
    case SortOrders.Rated:
      return offers.slice().sort((a, b) => b.rating - a.rating);
    default:
      return offers.slice();
  }
};

export const isPasswordValid = (pass: string): boolean => PASSWORD_REGEX.test(pass);

export const isValidForm = (text: string, rating: number): boolean => text.length > FormValidation.MinLength
  && text.length < FormValidation.MaxLength
  && rating >= FormValidation.MinRating
  && rating <= FormValidation.MaxRating;

export const isPending = (status: RequestStatusType) => status === RequestStatus.Pending;

export const isFulfilled = (status: RequestStatusType) => status === RequestStatus.Fulfilled;

export const isRejected = (status: RequestStatusType) => status === RequestStatus.Rejected;

export const getFavoriteStatusCode = (isFavorite: boolean): number => isFavorite ? 1 : 0;
