import { Helmet } from 'react-helmet-async';

import { Offers } from '../../types/offers';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import SmallCardsList from '../../components/small-cards-list/small-cards-list';
import { useAppSelector } from '../../hooks';

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

function FavoritesScreen(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const uniqueCities = [...new Set(offers.map((offer) => offer.city.name))];
  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Favorites</title>
      </Helmet>
      <Header></Header>

      <main className="page__main page__main--favorites">
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
      </main >
      <Footer></Footer>
    </div >
  );
}

export default FavoritesScreen;
