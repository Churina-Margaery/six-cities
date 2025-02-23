import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import React from 'react';

import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';
import { getAuthorizationStatus, getUserEmail } from '../../store/user-process/selectors';
import { getFavoritesCount } from '../../store/data-process/selectors';

type AuthDataProps = {
  authStatus: AuthorizationStatus;
  userEmail: string;
  favoritesCount: number;
}

function AuthData({ authStatus, userEmail, favoritesCount }: AuthDataProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(logoutAction());
  };

  if (authStatus === AuthorizationStatus.Auth) {
    return (
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{userEmail}</span>
            <span className="header__favorite-count">{favoritesCount}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <a className="header__nav-link">
            <span className="header__signout" onClick={handleSignOut}>Sign out</span>
          </a>
        </li>
      </ul>
    );
  }
  return (
    <ul className="header__nav-list">
      <li className="header__nav-item">
        <Link className="header__nav-link" to={AppRoute.Login}>
          <span className="header__signout">Sign in</span>
        </Link>
      </li>
    </ul>
  );
}

function Header(): JSX.Element {
  const navigate = useNavigate();
  const authStatus = useAppSelector(getAuthorizationStatus);
  const userEmail = useAppSelector(getUserEmail);
  const favCount = useAppSelector(getFavoritesCount);
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link" onClick={() => navigate(AppRoute.Root)}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </a>
          </div>
          <nav className="header__nav">
            <AuthData
              authStatus={authStatus}
              userEmail={userEmail}
              favoritesCount={favCount}
            />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);
