import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: JSX.Element;
  authorizationStatus: AuthorizationStatus;
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { restrictedFor, redirectTo, children, authorizationStatus } = props;

  return (
    authorizationStatus === restrictedFor
      ? <Navigate to={redirectTo} />
      : children
  );
}
