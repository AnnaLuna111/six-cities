import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutUserAction } from '../../store/api-actions';
import { selectAuthorizationStatus, selectEmail } from '../../store/user/user-selectors';
import { selectFavorites } from '../../store/favorites/favorites-selectors';
import { Logo } from '../logo/logo';

type HeaderProps = {
	hideNavigation?: boolean;
};

export const Header = ({hideNavigation = false}: HeaderProps) => {
  const dispatch = useAppDispatch();
  const authorization = useAppSelector(selectAuthorizationStatus);
  const email = useAppSelector(selectEmail);
  const offers = useAppSelector(selectFavorites) ?? [];
  const favoritesCount = offers.length;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {!hideNavigation && (
            <nav className="header__nav">
              {authorization === AuthorizationStatus.Auth ? (
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">{email}</span>
                      <span className="header__favorite-count">{favoritesCount}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to={AppRoute.Login}
                      onClick={(evt) => {
                        evt.preventDefault();
                        dispatch(logoutUserAction());
                      }}
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="header__nav-list">
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={AppRoute.Login}>
                      <span className="header__signout">Sign in</span>
                    </Link>
                  </li>
                </ul>
              )}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};
