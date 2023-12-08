import { AppRoute, CardDesign } from '../../const';
import { OfferProps } from '../../types/offer-type';
import { Card } from './card';

type NearbyListProps = {
  offers: OfferProps[];
};

export const NearbyList = ({offers}: NearbyListProps) => {
  const designProps = CardDesign[AppRoute.Offer];

  return (
    <div className='near-places__list places__list'>
      {offers.map(
        (offer) => (
          <Card
            key={offer.id}
            offer={offer}
            {...designProps}
          />)
      )}
    </div>
  );
};
