import React, { useEffect } from 'react';

import styles from './styles.module.css';

const App = () => {
  useEffect(() => {
    fetch('http://localhost:3000/api/v1/resources')
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return <div className={styles.container}>Wadus wadus</div>;
};

export default App;
