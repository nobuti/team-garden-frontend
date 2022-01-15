import React from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

const Resources = () => (
  <div className={cx(styles.container, { [styles.isActive]: true })}>
    Resources
  </div>
);

export default Resources;
