import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';

import store from '~/store';
import Container from '~/components/Container';
import Navigation from '~/components/Navigation';
import Main from '~/components/Main';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

const App = () => (
  <Provider store={store}>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <Container>
        <Navigation />
        <Main />
      </Container>
    </Auth0Provider>
  </Provider>
);

export default App;
