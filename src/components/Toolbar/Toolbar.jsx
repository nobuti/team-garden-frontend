import React from 'react';
// import cx from 'classnames';

import styles from './styles.module.css';

const Toolbar = ({ leftAction, title, rightAction }) => (
  <div className={styles.container}>
    {leftAction}
    <div className={styles.header}>{title}</div>
    {rightAction}
  </div>
);

export default Toolbar;
