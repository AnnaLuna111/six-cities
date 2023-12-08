import { FormEvent, Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useParams } from 'react-router-dom';
import { isPending, isRejected, isValidForm } from '../../helper';
import { clearErrorAction, postReviewAction } from '../../store/api-actions';
import { ErrorMessage, FormValidation, StarRatings } from '../../const';
import { selectReview, selectReviewPostingStatus, selectReviewRating } from '../../store/review/review-selectors';
import { setReview, setReviewRating, setStatusIdle } from '../../store/review/review-slice';

export const ReviewForm = () => {
  const dispatch = useAppDispatch();
  const offerId = useParams().id as string;
  const rating = useAppSelector(selectReviewRating);
  const review = useAppSelector(selectReview);
  const reviewPostingStatus = useAppSelector(selectReviewPostingStatus);

  const isButtonDisabled = !isValidForm(review, rating) || isPending(reviewPostingStatus);
  const isBlockedForm = isPending(reviewPostingStatus);

  if (isRejected(reviewPostingStatus)) {
    dispatch(clearErrorAction(ErrorMessage.FailedPostReview));
    dispatch(setStatusIdle());
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isValidForm(review, rating)) {
      dispatch(postReviewAction({
        id: offerId,
        comment: review,
        rating
      }));
    }
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit} action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {StarRatings.map(
          ({star, description}) => {
            const inputId = `${star}-stars`;
            const isChecked = star === rating;
            return (
              <Fragment key={star}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  onChange={(evt) => dispatch(setReviewRating(Number(evt.target.value)))}
                  value={star}
                  id={inputId}
                  type="radio"
                  checked={isChecked}
                  disabled={isBlockedForm}
                />
                <label htmlFor={inputId} className="reviews__rating-label form__rating-label" title={description}>
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star" />
                  </svg>

                </label>
              </Fragment>
            );
          }
        )}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review" value={review}
        onChange={(evt) => dispatch(setReview(evt.target.value))}
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        minLength={FormValidation.MinLength}
        maxLength={FormValidation.MaxLength}
        disabled={isBlockedForm}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isButtonDisabled}
        >Submit
        </button>
      </div>
    </form>
  );
};
