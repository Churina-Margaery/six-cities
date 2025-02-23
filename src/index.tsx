import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';

import { fetchOffersAction, checkAuthAction } from './store/api-actions';
import { store } from './store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
