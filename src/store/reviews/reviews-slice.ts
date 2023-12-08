import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { ReviewProps } from '../../types/review-type';
import { RequestStatusType } from '../../types/state';
import { loadReviewsAction } from '../api-actions';

type ReviewsType = {
  reviews: ReviewProps[];
  reviewsLoadingStatus: RequestStatusType;
  hasReviewsError: boolean;
}

const initialState: ReviewsType = {
  reviews: [],
  reviewsLoadingStatus: RequestStatus.Idle,
  hasReviewsError: false
};

export const reviews = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    getReviews: (state, action: PayloadAction<ReviewProps[]>) => {
      state.reviews = action.payload;
    },
    addReview: (state, action: PayloadAction<ReviewProps>) => {
      state.reviews.unshift(action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loadReviewsAction.pending, (state) => {
        state.reviewsLoadingStatus = RequestStatus.Pending;
        state.hasReviewsError = false;
      })
      .addCase(loadReviewsAction.fulfilled, (state) => {
        state.reviewsLoadingStatus = RequestStatus.Fulfilled;
      })
      .addCase(loadReviewsAction.rejected, (state) => {
        state.reviewsLoadingStatus = RequestStatus.Rejected;
        state.hasReviewsError = true;
      });
  }
});

export const {getReviews, addReview} = reviews.actions;

