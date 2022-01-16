/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';

import { ACTION, FETCH } from '~/config';
import Toolbar from '~/components/Toolbar';
import Loading from '~/components/Loading';
import Resource from '~/components/Resource';
import List from '~/components/List';

import styles from './styles.module.css';

const MenuAction = () => (
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
);

const BookmarksAction = () => (
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
);
const Resources = () => {
  const resources = useSelector((state) => state.resources);
  const bookmarks = useSelector((state) => state.bookmarks.bookmarks);
  const data = resources.resources.filter((r) => !bookmarks.includes(r.id));
  const isLoading =
    resources.status === FETCH.status.fetching &&
    resources.resources.length === 0;

  return (
    <div className={cx(styles.container, { [styles.isActive]: true })}>
      <Toolbar
        title="Discover"
        leftAction={<MenuAction />}
        rightAction={<BookmarksAction />}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <List
          data={data}
          metakey="id"
          render={(d) => <Resource action={ACTION.save} {...d} />}
        />
      )}
    </div>
  );
};

export default Resources;
