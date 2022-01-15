import React, { useEffect } from 'react';
import Navigation from '~/components/Navigation';

const App = () => {
  useEffect(() => {
    fetch('http://localhost:3000/api/v1/resources')
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return <Navigation />;
};

export default App;
