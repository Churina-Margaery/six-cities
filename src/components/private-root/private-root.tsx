import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRootProps = {
  authorizatonStatus: AuthorizationStatus;
  children: JSX.Element;
}
