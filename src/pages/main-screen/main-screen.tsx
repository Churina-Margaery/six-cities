import { Helmet } from 'react-helmet-async';
import { useCallback, useState } from 'react';

import OffersList from '../../components/offers-list/offers-list';
import { Offers } from '../../types/offers';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action';
import SortChoice from '../../components/sort-types/sort-types';
import { getCityParams, getPluralEnding } from '../../utils';
import Header from '../../components/header/header';

type EmptyCityProps = {
  cityName: string;
}

function EmptyCity({ cityName }: EmptyCityProps): JSX.Element {
  return (
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">We could not find any property available at the moment in {cityName}</p>
        </div>
      </section>
      <div className="cities__right-section"></div>
    </div>
  );
}

type MainScreenProps = {
  offers: Offers;
}

function MainScreen({ offers }: MainScreenProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState(offers[0]);
  const dispatch = useAppDispatch();
  const cityName = useAppSelector((state) => state.activeCityName);
  const offersNum = useAppSelector((state) => state.offersByCity.length);

  const handleOffersHover = (OfferId: string) => {
    const offerFound = offers.find((offer) =>
      offer.id === OfferId,
    );
    const currentOffer = offerFound !== undefined ? offerFound : offers[0];
    setSelectedOffer(currentOffer);
  };

  const handleCityHover = useCallback((city: string) => {
    dispatch(changeCity(city));
  }, [dispatch]);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList
          chosenCity={cityName}
          onCityHover={handleCityHover}
        />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersNum} {getPluralEnding(offersNum, 'place')} to stay in {cityName}</b>
              <SortChoice />
              <OffersList
                offers={useAppSelector((state) => state.offersByCity)}
                onOfferHover={handleOffersHover}
                classes="cities__places-list places__list tabs__content"
              />
              {offersNum === 0 && <EmptyCity cityName={cityName} />}
            </section>
            <Map
              city={{
                'name': cityName,
                'location': getCityParams(cityName),
              }}
              offers={useAppSelector((state) => state.offersByCity)}
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
