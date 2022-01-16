/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import styles from './styles.module.css';

const List = ({ data, render, key }) => (
  <ul className={styles.list}>
    {data.map((d) => (
      <li key={d[key]}>{render(d)}</li>
    ))}
  </ul>
);

export default List;
