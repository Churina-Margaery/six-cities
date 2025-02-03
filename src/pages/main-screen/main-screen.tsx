import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import OffersList from '../../components/offers-list/offers-list';
import { Offers } from '../../types/offers';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action';

type MainScreenProps = {
  offersCount: number;
  offers: Offers;
}

function MainScreen({ offersCount, offers }: MainScreenProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState(offers[0]);
  const dispatch = useAppDispatch();

  const handleOffersHover = (OfferId: string) => {
    const offerFound = offers.find((offer) =>
      offer.id === OfferId,
    );
    const currentOffer = offerFound !== undefined ? offerFound : offers[0];
    setSelectedOffer(currentOffer);
  };

  const handleCityHover = (city: string) => {
    dispatch(changeCity(city));
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />

            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">{useAppSelector((state) => state.favoritesCount)}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList
          chosenCity={useAppSelector((state) => state.activeCityName)}
          onCityHover={handleCityHover}
        />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OffersList
                offers={useAppSelector((state) => state.offersByCity)}
                onOfferHover={handleOffersHover}
                classes="cities__places-list places__list tabs__content"
              />
            </section>
            <Map
              city={{
                'name': 'Amsterdam',
                'location': {
                  'latitude': 52.35514938496378,
                  'longitude': 4.673877537499948,
                  'zoom': 8
                }
              }}
              offers={offers}
              selectedPoint={selectedOffer.id}
              block='cities'
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
