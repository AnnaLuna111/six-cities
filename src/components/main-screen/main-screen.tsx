import classNames from 'classnames';
import { useAppSelector } from '../../hooks';
import { CardList } from '../cards/card-list';
import { CityList } from '../cards/city-list';
import { Header } from '../header/header';
import { EmptyList } from '../cards/empty-list';
import { selectDataErrorStatus, selectOffers, selectOffersLoadingStatus } from '../../store/offers/offers-selectors';
import { ErrorScreen } from '../error-screen/error-screen';
import { isFulfilled, isPending } from '../../helper';
import { Loading } from '../loading/loading';


export const MainScreen = () => {
  const offers = useAppSelector(selectOffers);
  const hasError = useAppSelector(selectDataErrorStatus);
  const offersLoadingStatus = useAppSelector(selectOffersLoadingStatus);

  const isEmptyList = !offers.length;
  const pageClass = classNames(
    'page__main',
    'page__main--index',
    {'page__main--index-empty' : isEmptyList}
  );

  return (
    <>
      {hasError && <ErrorScreen />}
      {isPending(offersLoadingStatus) && <Loading />}
      {!hasError && isFulfilled(offersLoadingStatus) &&

      <div className="page page--gray page--main">
        <Header />
        <main className={pageClass}>
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CityList />
            </section>
          </div>
          <div className="cities">
            {isEmptyList ? (
              <EmptyList />
            ) : (
              <CardList offers={offers} />
            )}
          </div>
        </main>
      </div>}
    </>
  );
};
