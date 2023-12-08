import { Link } from 'react-router-dom';
import { CITIES } from '../../const';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectLocation } from '../../store/card-list/card-list-selectors';
import { updateLocation } from '../../store/card-list/card-list-slice';

export const CityList = () => {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(selectLocation);

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li className="locations__item" key={city}>
          <Link className={classNames(
            'locations__item-link',
            'tabs__item',
            {'tabs__item--active': city === selectedCity})}
          to={`#${city.toLowerCase()}`}
          onClick={() => dispatch(updateLocation(city))}
          >
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
