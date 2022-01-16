/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import styles from './styles.module.css';

const List = ({ data, render, metakey }) => {
  if (data.length === 0) {
    return (
      <div className={styles.empty}>
        There are no results to show. Take the time and send an insteresting
        resource for you and your team!
      </div>
    );
  }
  return (
    <ul className={styles.list}>
      {data.map((d) => (
        <li key={d[metakey]}>{render(d)}</li>
      ))}
    </ul>
  );
};

export default List;
