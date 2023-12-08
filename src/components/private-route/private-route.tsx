import {Navigate} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectAuthorizationStatus } from '../../store/user/user-selectors';

type PrivateRouteProps = {
	children: React.JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): React.JSX.Element {
	const { children } = props;
	const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}


export default PrivateRoute;
