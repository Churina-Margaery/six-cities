import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: JSX.Element;
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { restrictedFor, redirectTo, children } = props;
  const authorizationStatus = AuthorizationStatus.Auth;

  return (
    authorizationStatus === restrictedFor
      ? <Navigate to={redirectTo} />
      : children
  );
}
