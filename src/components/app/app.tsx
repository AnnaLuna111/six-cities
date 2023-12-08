import { Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../login-screen/login-screen';
import { MainScreen } from '../main-screen/main-screen';
import { AppRoute } from '../../const';
import PrivateRoute from '../private-route/private-route';
import { FavoritesScreen } from '../favorites-screen/favorites-screen';
import { OfferScreen } from '../offer-screen/offer-screen';
import { NotFoundPage } from '../not-found-page/not-found-page';


export const App = () => (
  <Routes>
    <Route
      path={AppRoute.Main}
      element={<MainScreen />}
    />
    <Route
      path={AppRoute.Login}
      element={<LoginScreen />}
    />
    <Route
      path={AppRoute.Favorites}
      element={
        <PrivateRoute>
          <FavoritesScreen />
        </PrivateRoute>
      }
    />
    <Route
      path={`${AppRoute.Offer}/:id`}
      element={<OfferScreen />}
    />
    <Route
      path={AppRoute.NotFound}
      element={<NotFoundPage/>}
    />
  </Routes>
);
