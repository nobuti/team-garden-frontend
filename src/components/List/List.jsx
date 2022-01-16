/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import styles from './styles.module.css';

const List = ({ data, render, metakey }) => (
  <ul className={styles.list}>
    {data.map((d) => (
      <li key={d[metakey]}>{render(d)}</li>
    ))}
  </ul>
);

export default List;
