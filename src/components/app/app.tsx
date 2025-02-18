import { Route, BrowserRouter, Routes } from 'react-router-dom';

import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainEmptyScreen from '../../pages/main-empty-screen/main-empty-screen';
import OfferNotLoggedScreen from '../../pages/offer-not-logged-screen/offer-not-logged-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import PageNotFoundScreen from '../../pages/page-not-found-screen/page-not-found-screen';
import { HelmetProvider } from 'react-helmet-async';

import { AppRoute } from '../../const';
import PrivateRoute from '../private-root/private-root';
import { AuthorizationStatus } from '../../const';

import { Offers } from '../../types/offers';
import { Reviews } from '../../types/reviews';

type AppScreenProps = {
  offers: Offers;
  reviews: Reviews;
}

function App({ offers, reviews }: AppScreenProps): JSX.Element {
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
                restrictedFor={AuthorizationStatus.Auth}
                redirectTo={AppRoute.Root}
              >
                <LoginScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.MainEmpty}
            element={<MainEmptyScreen />}
          />
          <Route
            path={`${AppRoute.OfferLogged}/:offerId`}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.NoAuth}
                redirectTo={AppRoute.Login}
              >
                <OfferScreen
                  reviews={reviews}
                />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.OfferNotLogged}/:offerId`}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.Auth}
                redirectTo={AppRoute.Root}
              >
                <OfferNotLoggedScreen />
              </PrivateRoute>
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
