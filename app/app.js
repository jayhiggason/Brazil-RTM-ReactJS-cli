/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';
import * as Sentry from '@sentry/browser';
import ErrorBoundary from "./components/ErrorBoundary";
import config from "./config.json";
// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/marsIcon.png';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './configureStore';

// Import i18n messages
import {translationMessages} from './i18n';
import {runWithAdal} from "react-adal";
import {authContext} from "./adalConfig";

const {sentryUrl} = config;
Sentry.init({
  dsn: sentryUrl});

// Create redux store with history
const initialState = {};
const store = configureStore(history, initialState);
const MOUNT_NODE = document.getElementById('app');

const DO_NOT_LOGIN = false;

const render = messages => {
  ReactDOM.render(
    <ErrorBoundary>
      <Provider store={store}>
        <LanguageProvider messages={messages}>
          <ConnectedRouter history={history}>
            <App/>
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>
    </ErrorBoundary>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    // render(translationMessages);
    runWithAdal(
      authContext,
      () => {
        render(translationMessages);
      },
      DO_NOT_LOGIN
    );
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js'),import('intl/locale-data/jsonp/pt.js')]))
    .then(() =>
    // render(translationMessages))
      runWithAdal(
        authContext,
        () => {
          render(translationMessages);
        },
        DO_NOT_LOGIN
      )
    )
    .catch(err => {
      throw err;
    });
} else {
  // render(translationMessages);
  runWithAdal(
    authContext,
    () => {
      render(translationMessages);
    },
    DO_NOT_LOGIN
  )
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
