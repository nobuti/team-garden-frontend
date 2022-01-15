import React from 'react';

import styles from './styles.module.css';

const User = () => (
  <div className={styles.container}>
    <div className={styles.separator}>
      <button className={styles.button} type="button">
        Login with GitHub
      </button>
    </div>
  </div>
);

export default User;
