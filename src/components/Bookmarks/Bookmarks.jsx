/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import cx from 'classnames';

import { FETCH, ACTION } from '~/config';
import Toolbar from '~/components/Toolbar';
import Loading from '~/components/Loading';
import Resource from '~/components/Resource';
import Placeholder from '~/components/Placeholder';
import List from '~/components/List';

import styles from './styles.module.css';

const BackAction = () => (
  <button className={cx(styles.button, styles.back)} type="button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      className={styles.icon}
      height={12}
    >
      <path
        fill="currentColor"
        d="M229.9 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L94.569 282H436c6.627 0 12-5.373 12-12v-28c0-6.627-5.373-12-12-12H94.569l155.13-155.13c4.686-4.686 4.686-12.284 0-16.971L229.9 38.101c-4.686-4.686-12.284-4.686-16.971 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971L212.929 473.9c4.686 4.686 12.284 4.686 16.971-.001z"
      />
    </svg>
  </button>
);

const Bookmarks = () => {
  const resources = useSelector((state) => state.resources.resources);
  const bookmarks = useSelector((state) => state.bookmarks);
  const { isAuthenticated } = useAuth0();

  const isLoading =
    bookmarks.status === FETCH.status.fetching &&
    bookmarks.bookmarks.length === 0;
  const data = resources.filter((r) => bookmarks.bookmarks.includes(r.id));

  if (!isAuthenticated) {
    return (
      <div className={cx(styles.container, { [styles.isActive]: false })}>
        <Placeholder />
      </div>
    );
  }

  return (
    <div className={cx(styles.container, { [styles.isActive]: false })}>
      <Toolbar title="Bookmarks" leftAction={<BackAction />} />
      {isLoading ? (
        <Loading />
      ) : (
        <List
          data={data}
          metakey="id"
          render={(d) => <Resource action={ACTION.remove} {...d} />}
        />
      )}
    </div>
  );
};

export default Bookmarks;
