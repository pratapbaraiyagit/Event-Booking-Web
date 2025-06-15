import * as React from 'react';
import ReactDOM from 'react-dom/client';
import 'sanitize.css/sanitize.css';
import { App } from 'app';
import { HelmetProvider } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../src/Assets/scss/Style.scss';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import ToastNotification from 'Components/ToastNotification';

const store = configureAppStore();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <HelmetProvider>
      <ToastNotification />
      <App />
    </HelmetProvider>
  </Provider>,
);
