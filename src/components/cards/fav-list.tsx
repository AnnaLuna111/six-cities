import { Link } from 'react-router-dom';
import { AppRoute, CITIES, CardDesign } from '../../const';
import { OfferProps } from '../../types/offer-type';
import { Card } from './card';

type FavListProps = {
  offers: OfferProps[];
};

export const FavoriteList = ({offers}: FavListProps) => {
  const designProps = CardDesign[AppRoute.Favorites];

  return (
    <ul className="favorites__list">
      {CITIES.map((city) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {offers
              .filter((offer) => offer.city.name === city)
              .map((offer) => (
                <Card offer={offer} key={offer.id} {...designProps}/>
              ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

