const Setting = {
  OffersCount: 318,
};

enum AppRoute {
  Favorites = '/favorites',
  EmptyFavorites = '/empty-favorites',
  Login = '/login',
  MainEmpty = '/empty',
  Root = '/',
  OfferNotLogged = '/offerUnlogged',
  OfferLogged = '/offer',
  PageNotFound = '/pageNotFound',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export { Setting, AppRoute, AuthorizationStatus };
