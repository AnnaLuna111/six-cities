import {Navigate} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { PropsWithChildren, ReactNode } from 'react';
import { useAppSelector } from '../../hooks';
import { selectAuthorizationStatus } from '../../store/user/user-selectors';

type PrivateRouteProps = PropsWithChildren

const PrivateRoute = ({children}: PrivateRouteProps): ReactNode => {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
};


export default PrivateRoute;
