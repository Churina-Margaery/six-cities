const Setting = {
  OffersCount: 318,
};

//const sixCities: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

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
