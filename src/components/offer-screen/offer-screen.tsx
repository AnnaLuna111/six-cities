import { useParams } from 'react-router-dom';
import { Header } from '../header/header';
import { AuthorizationStatus } from '../../const';
import { ReviewForm } from '../review-form/review-form';
import { OffersMap } from '../map/map';
import { NearbyList } from '../cards/nearby-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ReviewList } from '../reviews/review-list';
import { useEffect } from 'react';
import { loadOfferAction, loadOffersNearbyAction, loadReviewsAction } from '../../store/api-actions';
import { capitalize, getPlural, getRatingWidth, isFulfilled, isPending, isRejected } from '../../helper';
import { Loading } from '../loading/loading';
import { NotFoundPage } from '../not-found-page/not-found-page';
import { selectOffersNearby } from '../../store/offers-nearby/offers-nearby-selecrors';
import { selectAuthorizationStatus } from '../../store/user/user-selectors';
import { selectOffer, selectOfferStatus } from '../../store/offer/offer-selector';
import { BookmarkButton } from '../bookmark-button/bookmark-button';
import { setOfferId } from '../../store/offer/offer-slice';
import classNames from 'classnames';

export const OfferScreen = () => {
  const id = useParams().id as string;
  const dispatch = useAppDispatch();
  const offersNearby = useAppSelector(selectOffersNearby);
  const authorization = useAppSelector(selectAuthorizationStatus);
  const offer = useAppSelector(selectOffer);
  const offerLoadingStatus = useAppSelector(selectOfferStatus);

  useEffect(() => {
    if(id) {
      dispatch(setOfferId(id));
      dispatch(loadOfferAction(id));
      dispatch(loadReviewsAction(id));
      dispatch(loadOffersNearbyAction(id));
    }
  }, [id, dispatch]);

  const {
    title,
    isPremium,
    type,
    price,
    rating,
    images,
    goods,
    bedrooms,
    maxAdults,
    host,
    isFavorite,
    description
  } = offer;

  const ratingWidth = `${getRatingWidth(rating)}`;

  return (
    <>
      {isPending(offerLoadingStatus) && <Loading />}
      {isRejected(offerLoadingStatus) && <NotFoundPage />}
      {isFulfilled(offerLoadingStatus) && offer !== null &&
      <div className="page">
        <Header />
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {images.map((image) => (
                  <div className="offer__image-wrapper" key={image}>
                    <img
                      className="offer__image"
                      src={image}
                      alt="Photo studio"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">{title}</h1>
                  <BookmarkButton
                    id={id}
                    isFavorite={isFavorite}
                    className={'offer'}
                    size={'big'}
                  />
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: ratingWidth }} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">{capitalize(type)}</li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {bedrooms} {getPlural('Bedroom', bedrooms)}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} {getPlural('adult', maxAdults)}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">€{price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&#39;s inside</h2>
                  <ul className="offer__inside-list">
                    {goods.map((item) => (
                      <li className="offer__inside-item" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className={classNames(
                      'offer__avatar-wrapper',
                      {'offer__avatar-wrapper--pro': host.isPro,
                        'user__avatar-wrapper': !host.isPro})}
                    >
                      <img
                        className="offer__avatar user__avatar"
                        src={host.avatarUrl}
                        width={74}
                        height={74}
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{host.name}</span>
                    {host.isPro && <span className="offer__user-status">Pro</span>}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">{description}</p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <ReviewList />
                  {authorization === AuthorizationStatus.Auth && <ReviewForm />}
                </section>
              </div>
            </div>
            <OffersMap
              city={offer}
              points={[...offersNearby, offer]}
              className={'offer__map map'}
            />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <NearbyList offers={offersNearby}/>
            </section>
          </div>
        </main>
      </div>}
    </>
  );
};
