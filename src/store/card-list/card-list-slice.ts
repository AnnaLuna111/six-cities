import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CITIES, NameSpace, SortOrders } from '../../const';
import { City } from '../../types/offer-type';
import { SortOrderType } from '../../types/state';

export type CardListType = {
  location: City['name'];
  sort: SortOrderType;
}

export const initialState: CardListType = {
  location: CITIES[0],
  sort: SortOrders.Popular,
};

export const cardlist = createSlice({
  name: NameSpace.CardList,
  initialState,
  reducers: {
    updateLocation: (state, action: PayloadAction<City['name']>) => {
      state.location = action.payload;
    },
    sortOffers: (state, action: PayloadAction<SortOrderType>) => {
      state.sort = action.payload;
    }
  },
});

export const {updateLocation, sortOffers} = cardlist.actions;
