import React from 'react';

import styles from './styles.module.css';

const Loading = () => (
  <div className={styles.container}>
    <div className={styles.ripple}>
      <div />
      <div />
    </div>
  </div>
);

export default Loading;
