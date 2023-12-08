import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectReviewPostingStatus = (state: State) => state[NameSpace.Review].reviewPostingStatus;

export const selectReviewRating = (state: State) => state[NameSpace.Review].rating;

export const selectReview = (state: State) => state[NameSpace.Review].review;
