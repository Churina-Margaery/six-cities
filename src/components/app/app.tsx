import { Route, BrowserRouter, Routes } from 'react-router-dom';

import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import PageNotFoundScreen from '../../pages/page-not-found-screen/page-not-found-screen';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { HelmetProvider } from 'react-helmet-async';

import { AppRoute } from '../../const';
import PrivateRoute from '../private-root/private-root';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';


function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const offers = useAppSelector((state) => state.offers);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        < Routes >
          <Route
            path={AppRoute.Root}
            element={
              <MainScreen
                offers={offers}
              />
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
                restrictedFor={AuthorizationStatus.NoAuth}
                redirectTo={AppRoute.Login}
              >
                <FavoritesScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
                restrictedFor={AuthorizationStatus.Auth}
                redirectTo={AppRoute.Root}
              >
                <LoginScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.OfferLogged}/:offerId`}
            element={
              <OfferScreen />
            }
          />
          <Route
            path={`${AppRoute.OfferNotLogged}/:offerId`}
            element={
              <OfferScreen />
            }
          />
          <Route
            path="*"
            element={<PageNotFoundScreen />}
          />
        </Routes >
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
