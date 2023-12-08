import { Link, Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Header } from '../header/header';
import { selectAuthorizationStatus } from '../../store/user/user-selectors';
import { selectLocation } from '../../store/card-list/card-list-selectors';
import { AuthForm } from '../auth-form/auth-form';
import { updateLocation } from '../../store/card-list/card-list-slice';

export const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const authorization = useAppSelector(selectAuthorizationStatus);
  const location = useAppSelector(selectLocation);
  const handleClick = () => dispatch(updateLocation(location));

  return authorization !== AuthorizationStatus.Auth ? (
    <div className="page page--gray page--login">
      <Header hideNavigation/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <AuthForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Main}
                onClick={handleClick}
              >
                <span>{location}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  ) : <Navigate to={AppRoute.Main} />;
};
