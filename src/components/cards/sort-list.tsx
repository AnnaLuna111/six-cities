import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import classNames from 'classnames';
import { SortOrders } from '../../const';
import { selectSort } from '../../store/card-list/card-list-selectors';
import { sortOffers } from '../../store/card-list/card-list-slice';

export const SortList = () => {
  const sortOrders = Object.values(SortOrders);
  const sort = useAppSelector(selectSort);
  const dispatch = useAppDispatch();
  const [isActiveState, setActiveState] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}
        onClick={() => setActiveState((state) => (!state))}
      >
        {sort}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={classNames (
        'places__options',
        'places__options--custom',
        {'places__options--opened': isActiveState}
      )}
      >
        {sortOrders.map((item) =>
          (
            <li
              key={item}
              className={classNames('places__option', {'places__option--active': item === sort})}
              onClick={() => {
                dispatch(sortOffers(item));
                setActiveState((state) => !state);
              }}
              tabIndex={0}
            >
              {item}
            </li>
          )
        )}
      </ul>
    </form>
  );
};
