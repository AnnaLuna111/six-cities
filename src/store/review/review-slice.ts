import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { RequestStatusType } from '../../types/state';
import { postReviewAction } from '../api-actions';

export type ReviewType = {
  reviewPostingStatus: RequestStatusType;
  rating: number;
  review: string;
}

const initialState: ReviewType = {
  reviewPostingStatus: RequestStatus.Idle,
  rating: 0,
  review: ''
};

export const review = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {
    setStatusIdle: (state) => {
      state.reviewPostingStatus = RequestStatus.Idle;
    },
    setReviewRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
    },
    setReview: (state, action: PayloadAction<string>) => {
      state.review = action.payload;
    },
    resetReviewData: (state) =>{
      state.review = '';
      state.rating = 0;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(postReviewAction.pending, (state) => {
        state.reviewPostingStatus = RequestStatus.Pending;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.reviewPostingStatus = RequestStatus.Rejected;
      })
      .addCase(postReviewAction.fulfilled, (state) => {
        state.reviewPostingStatus = RequestStatus.Fulfilled;
      });
  }
});

export const {setStatusIdle, setReviewRating, setReview, resetReviewData} = review.actions;
