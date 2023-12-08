import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { loadFavoritesAction, loadOffersAction, updateAuthStatusAction } from './store/api-actions';
import HistoryRouter from './components/history-route/history-route';
import { browserHistory } from './browser-history';
import { ErrorMessage } from './components/error-message/error-message';

store.dispatch(updateAuthStatusAction());
store.dispatch(loadOffersAction());
store.dispatch(loadFavoritesAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ErrorMessage />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
