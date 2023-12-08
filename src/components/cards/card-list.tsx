import { AppRoute, CardDesign } from '../../const';
import { getPlural, sortOffers } from '../../helper';
import { useAppSelector } from '../../hooks';
import { selectLocation, selectSort } from '../../store/card-list/card-list-selectors';

import { OfferProps } from '../../types/offer-type';
import { OffersMap } from '../map/map';
import { Card } from './card';
import { SortList } from './sort-list';

type CardListProps = {
  offers: OfferProps[];
}

export const CardList = ({offers}: CardListProps) => {
  const designProps = CardDesign[AppRoute.Main];
  const location = useAppSelector(selectLocation);
  const sort = useAppSelector(selectSort);

  const filteredOffers = offers.filter((offer) => offer.city.name === location);
  const sortedOffers = sortOffers(filteredOffers, sort);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{filteredOffers.length} {getPlural('place', filteredOffers.length)} to stay in {location}</b>
        <SortList />
        <div className="cities__places-list places__list tabs__content">
          <div className='cities__places-list places__list tabs__content'>
            {sortedOffers.map((offer) => (<Card offer={offer} key={offer.id} {...designProps}/>))}
          </div>
        </div>
      </section>
      <div className="cities__right-section">
        <OffersMap
          city={filteredOffers[0]}
          points={filteredOffers}
          className={'cities__map map'}
        />
      </div>
    </div>
  );
};

