import React from 'react';

import styles from './styles.module.css';

const User = () => (
  <footer className={styles.container}>
    <div className={styles.separator}>
      <button className={styles.button} type="button">
        Login with GitHub
      </button>
    </div>
  </footer>
);

export default User;
