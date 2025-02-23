import { useAppSelector } from '../../hooks';
import { Offers } from '../../types/offers';
import SmallCardsList from '../../components/small-cards-list/small-cards-list';
import { getOffers } from '../../store/data-process/selectors';
import { getFavoriteOffers } from '../../store/data-process/selectors';

function FavoritesLocations(offers: Offers, cityName: string): JSX.Element {
  return (
    <div className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{cityName}</span>
          </a>
        </div>
      </div>
      <SmallCardsList
        offers={offers}
        cityName={cityName}
      />
    </div>
  );
}

function FavoritesList(): JSX.Element {
  const allOffers = useAppSelector(getOffers);
  const offersFavorite = useAppSelector(getFavoriteOffers);

  const offers = allOffers.filter((offer) =>
    offersFavorite.some((favorite) => favorite.id === offer.id)
  );

  const uniqueCities = [...new Set(offers.map((offer) => offer.city.name))];
  if (offers.length === 0) {
    return (
      <div className="page__favorites-container container">
        <section className="favorites favorites--empty">
          <h1 className="visually-hidden">Favorites (empty)</h1>
          <div className="favorites__status-wrapper">
            <b className="favorites__status">Nothing yet saved.</b>
            <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
          </div>
        </section>
      </div>
    );
  }
  return (
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {uniqueCities.map((cityName, id) => {
            const keyValue = `${id}-${cityName}`;
            return (
              <li key={keyValue}>
                {FavoritesLocations(offers, cityName)}
              </li>
            );
          })}
        </ul>

      </section>
    </div>
  );
}

export default FavoritesList;
