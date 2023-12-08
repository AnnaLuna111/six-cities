import { Link } from 'react-router-dom';
import { OfferProps } from '../../types/offer-type';
import { capitalize, getRatingWidth } from '../../helper';
import { useAppDispatch } from '../../hooks';
import { AppRoute } from '../../const';
import { setOfferId } from '../../store/offer/offer-slice';
import { BookmarkButton } from '../bookmark-button/bookmark-button';

type CardProps = {
	offer: OfferProps;
  cardClass: string;
  cardInfoClass: string;
  cardWidth: string;
  cardHeight: string;
};

export const Card = ({offer, cardClass,cardWidth, cardHeight, cardInfoClass}: CardProps) => {
  const {id, title, type, price, previewImage, isFavorite, isPremium, rating} = offer;
  const href = `${AppRoute.Offer}/${id}`;
  const ratingWidth = `${getRatingWidth(rating)}`;

  const dispatch = useAppDispatch();

  return (
    <article
      className={`${cardClass}__card place-card`}
      onMouseEnter={() => dispatch(setOfferId(id))} onMouseLeave={() => dispatch(setOfferId(''))}
    >
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`${cardClass}__image-wrapper place-card__image-wrapper`}>
        <Link to={href}>
          <img
            className="place-card__image"
            src={previewImage}
            width={cardWidth}
            height={cardHeight}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${cardInfoClass} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <BookmarkButton id={id} isFavorite={isFavorite} className={'place-card'} size={'small'} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidth }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={href}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
};
