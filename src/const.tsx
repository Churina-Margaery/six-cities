const sixCities: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const TIMEOUT_SHOW_ERROR = 2000;

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

enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite',
}

enum SortTypes {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  RatingTop = 'Top rated first',
}

enum NameSpace {
  Main = 'main',
  Data = 'data',
  User = 'user',
}

const URL_MARKER_DEFAULT: string = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

const URL_MARKER_CURRENT: string = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export { AppRoute, AuthorizationStatus, APIRoute, NameSpace, SortTypes, URL_MARKER_CURRENT, URL_MARKER_DEFAULT, sixCities };
