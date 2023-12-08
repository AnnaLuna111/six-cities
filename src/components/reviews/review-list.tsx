import { getPlural, isFulfilled, isPending, isRejected } from '../../helper';
import { useAppSelector } from '../../hooks';
import { selectReviews, selectReviewsStatus } from '../../store/reviews/reviews-selectors';
import { Review } from './review';

const MAX_REVIEWS_COUNT = 10;

export const ReviewList = () => {
  const reviews = useAppSelector(selectReviews);
  const reviewsLoadingStatus = useAppSelector(selectReviewsStatus);
  const sortedReviews = reviews
    .slice(0, MAX_REVIEWS_COUNT)
    .sort((a,b) => Date.parse(b.date) - Date.parse(a.date));

  return (
    <>
      <h2 className="reviews__title">
        {getPlural('Review', reviews.length)} · <span className="reviews__amount">{reviews.length || 0}</span>
      </h2>
      {isPending(reviewsLoadingStatus) && <div><span>Reviews loading ...</span></div>}
      {isRejected(reviewsLoadingStatus) && <div><span>Failed to load reviews ...</span></div>}
      {isFulfilled(reviewsLoadingStatus) && sortedReviews.length > 0 &&
      <ul className="reviews__list">
        {sortedReviews.map((review) => <Review {...review} key={review.date}/>)}
      </ul>}
    </>
  );
};
