import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Setting } from './const';

import { offers } from './mocks/offers';
import { reviewsMock } from './mocks/reviews';
import { Provider } from 'react-redux';
import { store } from './store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offersCount={Setting.OffersCount}
        offers={offers}
        reviews={reviewsMock}
      />
    </Provider>
  </React.StrictMode>
);
