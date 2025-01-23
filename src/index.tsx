import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Setting } from './const';

import { offers } from './mocks/offers';
import getOffer from './mocks/separated-offers';
import { reviewsMock } from './mocks/reviews';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offersCount={Setting.OffersCount}
      offers={offers}
      offer={getOffer()}
      reviews={reviewsMock}
    />
  </React.StrictMode>
);
