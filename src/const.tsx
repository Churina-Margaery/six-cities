const Setting = {
  OffersCount: 318,
};

const sixCities: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

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

const SortTypes = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

// const SortTypes = {
//   'Popular': 'Popular',
//   'PriceLowToHigh': 'Price: low to high',
//   'PriceHighToLow': 'Price: high to low',
//   'RatingTop': 'Top rated first',
// };

const URL_MARKER_DEFAULT: string = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

const URL_MARKER_CURRENT: string = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export { Setting, AppRoute, AuthorizationStatus, SortTypes, URL_MARKER_CURRENT, URL_MARKER_DEFAULT, sixCities };
