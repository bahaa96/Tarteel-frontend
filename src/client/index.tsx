/* eslint-disable global-require */

import React from 'react';
import ReactDOM, { render } from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import asyncBootstrapper from 'react-async-bootstrapper';
import { AsyncComponentProvider } from 'react-async-component';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from "styled-components"
import { Provider } from 'react-redux';
import { Cookies, CookiesProvider } from 'react-cookie';

import './polyfills/index';

import ReactHotLoader from './components/ReactHotLoader';
import App from '../App';
import { configStore } from '../store';
import { getLocalStorage } from '../helpers/get';
import getLocalMessages from '../helpers/setLocale';
import theme from '../theme';

// Get the DOM Element that will host our React application.
const container = document.querySelector('#app');

window.ReactDOM = ReactDOM; // For chrome dev tool support

const cookies = new Cookies(document.cookie)


window.clearCookies = () => {
  // reactCookie.remove('isFirstTime');
  // cookies.remove('currentLocale');
};

const fakeRequest = {
  universalCookies: cookies,
  query: {}
}

// Does the user's browser support the HTML5 history API?
// If the user's browser doesn't support the HTML5 history API then we
// will force full page refreshes on each page change.
const supportsHistory = 'pushState' in window.history;

// Get any rehydrateState for the async components.
// eslint-disable-next-line no-underscore-dangle
const asyncComponentsRehydrateState = window.__ASYNC_COMPONENTS_REHYDRATE_STATE__;

const store = configStore();

getLocalStorage(store);

/**
 * Renders the given React Application component.
 */
function renderApp(TheApp) {
  // Firstly, define our full application component, wrapping the given
  // component app with a browser based version of react router.
  const app = (
    <ReactHotLoader>
      <AsyncComponentProvider rehydrateState={asyncComponentsRehydrateState}>
        <Provider store={store} key="provider">
          <IntlProvider locale="en" messages={getLocalMessages(fakeRequest)}>
            <ThemeProvider theme={theme}>
              <BrowserRouter forceRefresh={!supportsHistory}>
                <CookiesProvider>
                  <TheApp />
                </CookiesProvider>
              </BrowserRouter>
            </ThemeProvider>
          </IntlProvider>
        </Provider>
      </AsyncComponentProvider>
    </ReactHotLoader>
  );

  // We use the react-async-component in order to support code splitting of
  // our bundle output. It's important to use this helper.
  // @see https://github.com/ctrlplusb/react-async-component
  asyncBootstrapper(app).then(() => render(app, container));
}

// Execute the first render of our app.
renderApp(App);

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
require('./registerServiceWorker');

// The following is needed so that we can support hot reloading our application.
if (process.env.BUILD_FLAG_IS_DEV === 'true' && module.hot) {
  // Accept changes to this file for hot reloading.
  // module.hot.accept('./index.tsx');
  // Any changes to our App will cause a hotload re-render.
  module.hot.accept('../App', () => {
    renderApp(require('../App').default);
  });
}
