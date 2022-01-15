import React from 'react';

import Header from '~/components/Header';
import Filter from '~/components/Filter';
import User from '~/components/User';

import styles from './styles.module.css';

const Navigation = () => (
  <nav className={styles.container}>
    <Header />
    <Filter />
    <User />
  </nav>
);

export default Navigation;
