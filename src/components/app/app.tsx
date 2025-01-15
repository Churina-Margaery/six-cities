import { Route, BrowserRouter, Routes } from 'react-router-dom';

import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesEmptyScreen from '../../pages/favorites-empty-screen/favorites-empty-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainEmptyScreen from '../../pages/main-empty-screen/main-empty-screen';
import OfferNotLoggedScreen from '../../pages/offer-not-logged-screen/offer-not-logged-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import PageNotFoundScreen from '../../pages/page-not-found-screen/page-not-found-screen';

import { AppRoute } from '../../const';
import PrivateRoute from '../private-root/private-root';
import { AuthorizationStatus } from '../../const';

type AppScreenProps = {
  offersCount: number;
}

function App({ offersCount }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      < Routes >
        <Route
          path={AppRoute.Root}
          element={<MainScreen offersCount={offersCount} />}
        />
        <Route
          path={AppRoute.EmptyFavorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <FavoritesEmptyScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.MainEmpty}
          element={<MainEmptyScreen />}
        />
        <Route
          path={AppRoute.OfferLogged}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <OfferScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.OfferNotLogged}
          element={<OfferNotLoggedScreen />}
        />
        <Route
          path="*"
          element={<PageNotFoundScreen />}
        />
      </Routes >
    </BrowserRouter>
  );
}

export default App;
