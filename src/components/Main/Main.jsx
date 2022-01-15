import React from 'react';

import Resources from '~/components/Resources';
import Bookmarks from '~/components/Bookmarks';

import styles from './styles.module.css';

const Main = () => (
  <main className={styles.container}>
    <Resources />
    <Bookmarks />
  </main>
);

export default Main;
