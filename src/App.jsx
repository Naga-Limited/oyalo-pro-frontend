import React from 'react';
import {unstable_HistoryRouter as Router} from 'react-router-dom';
import Auth from './screens/App/common/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import NoInternetConnections from './screens/App/noInternetConnections/noInternetConnections';
import history from './@app/history';

export default function App() {
  return (
    <Router history={history}>
      <NoInternetConnections>
        <Auth />
      </NoInternetConnections>
    </Router>
  );
}
