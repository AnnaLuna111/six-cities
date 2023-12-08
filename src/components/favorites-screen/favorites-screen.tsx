import { FavoriteList } from '../cards/fav-list';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { useAppSelector } from '../../hooks';
import { selectFavorites, selectFavortiesStatus } from '../../store/favorites/favorites-selectors';
import classNames from 'classnames';
import { isFulfilled, isPending, isRejected } from '../../helper';
import { ErrorScreen } from '../error-screen/error-screen';
import { Loading } from '../loading/loading';

export const FavoritesScreen = () => {
  const offers = useAppSelector(selectFavorites);
  const isEmptyList = !offers.length;
  const favoritesLoadingStatus = useAppSelector(selectFavortiesStatus);

  return (
    <>
      {isPending(favoritesLoadingStatus) && <Loading />}
      {isRejected(favoritesLoadingStatus) && <ErrorScreen />}
      {isFulfilled(favoritesLoadingStatus) &&
    <div className="page">
      <Header />
      <main className={classNames(
        'page__main page__main--favorites',
        {'page__main--favorites-empty' : isEmptyList})}
      >
        <div className="page__favorites-container container">
          {isEmptyList ? (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoriteList offers={offers} />
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>}
    </>
  );
};
