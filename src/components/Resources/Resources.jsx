/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';

import { FETCH } from '~/config';
import Toolbar from '~/components/Toolbar';
import Loading from '~/components/Loading';
import Resource from '~/components/Resource';

import styles from './styles.module.css';

const List = ({ resources }) => (
  <ul className={styles.list}>
    {resources.map((resource) => (
      <li key={resource.url}>
        <Resource {...resource} />
      </li>
    ))}
  </ul>
);

const Resources = () => {
  const data = useSelector((state) => state.resources);
  const isLoading =
    data.status === FETCH.status.fetching && data.resources.length === 0;

  return (
    <div className={cx(styles.container, { [styles.isActive]: true })}>
      <Toolbar />
      {isLoading ? <Loading /> : <List resources={data.resources} />}
    </div>
  );
};

export default Resources;
