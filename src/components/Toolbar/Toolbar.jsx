import React from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

const Toolbar = () => (
  <div className={styles.container}>
    <button className={cx(styles.button, styles.menu)} type="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className={styles.icon}
        height={12}
      >
        <path
          fill="currentColor"
          d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
        />
      </svg>
    </button>
    <div className={styles.header}>Discover</div>
    <button className={cx(styles.button, styles.bookmarks)} type="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        className={styles.icon}
        height={12}
      >
        <path
          fill="currentColor"
          d="M336 0H48C21.49 0 0 21.49 0 48v464l192-112 192 112V48c0-26.51-21.49-48-48-48zm0 428.43l-144-84-144 84V54a6 6 0 0 1 6-6h276c3.314 0 6 2.683 6 5.996V428.43z"
        />
      </svg>
    </button>
  </div>
);

export default Toolbar;
