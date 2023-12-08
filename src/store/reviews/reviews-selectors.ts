import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectReviews = (state: State) => state[NameSpace.Reviews].reviews;

export const selectReviewsStatus = (state: State) => state[NameSpace.Reviews].reviewsLoadingStatus;

export const seleReviewsErrorStatus = (state: State) => state[NameSpace.Reviews].hasReviewsError;
