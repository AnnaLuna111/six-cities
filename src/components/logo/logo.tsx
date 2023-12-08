import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { AppRoute, LogoSizes } from '../../const';

type LogoProps = {
  isFooterLogo?: boolean;
}

export const Logo = ({isFooterLogo}: LogoProps) => (
  <Link
    className={classNames({
      'header__logo-link': !isFooterLogo,
      'footer__logo-link': isFooterLogo
    })}
    to={AppRoute.Main}
  >
    <img
      className={classNames({
        'footer__logo': isFooterLogo,
        'header__logo' : !isFooterLogo
      })}
      src="img/logo.svg"
      alt="6 cities logo"
      width={isFooterLogo ? LogoSizes.Width.footer : LogoSizes.Width.header}
      height={isFooterLogo ? LogoSizes.Height.footer : LogoSizes.Height.header}
    />
  </Link>
);
