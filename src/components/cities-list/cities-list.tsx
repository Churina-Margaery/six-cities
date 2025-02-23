import { Link } from 'react-router-dom';
import { sixCities } from '../../const';
import { AppRoute } from '../../const';
import React from 'react';

type CitiesListProps = {
  chosenCity: string;
  onCityHover: (city: string) => void;
}

function CitiesList({ chosenCity, onCityHover }: CitiesListProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {sixCities.map((cityName, id) => {
            const keyValue = `key-${id}`;
            return (
              <li className="locations__item" key={keyValue} onClick={() => {
                onCityHover(cityName);
              }}
              >
                <Link
                  className={`locations__item-link tabs__item ${cityName === chosenCity && 'tabs__item--active'}`}
                  to={AppRoute.Root}
                >
                  <span>{cityName}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default React.memo(CitiesList);
