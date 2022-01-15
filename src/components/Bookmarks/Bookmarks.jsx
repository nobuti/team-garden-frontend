import React from 'react';
import cx from 'classnames';

import Placeholder from '~/components/Placeholder';

import styles from './styles.module.css';

const Bookmarks = () => (
  <div className={cx(styles.container, { [styles.isActive]: false })}>
    <div className={cx(styles.inner, { [styles.isLogged]: false })}>
      <Placeholder />
    </div>
  </div>
);

export default Bookmarks;
