import React, { useEffect } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

import Container from '~/components/Container';
import Navigation from '~/components/Navigation';
import Main from '~/components/Main';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

const App = () => {
  useEffect(() => {
    fetch('http://localhost:3000/api/v1/resources')
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
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
  );
};

export default App;
