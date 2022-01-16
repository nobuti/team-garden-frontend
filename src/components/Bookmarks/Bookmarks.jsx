/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import cx from 'classnames';

import { ACTION, FETCH, VIEW } from '~/config';
import Toolbar from '~/components/Toolbar';
import Loading from '~/components/Loading';
import Resource from '~/components/Resource';
import Placeholder from '~/components/Placeholder';
import List from '~/components/List';
import { updateView } from '~/store/slices/view/actions';

import styles from './styles.module.css';

const BackAction = ({ onClick }) => (
  <button
    className={cx(styles.button, styles.back)}
    type="button"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      className={styles.icon}
      height={12}
    >
      <path
        fill="currentColor"
        d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
      />
    </svg>
  </button>
);

const Bookmarks = () => {
  const resources = useSelector((state) => state.resources.resources);
  const bookmarks = useSelector((state) => state.bookmarks);
  const currentMobileView = useSelector((state) => state.view.current);
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  const isLoading =
    bookmarks.status === FETCH.status.fetching &&
    bookmarks.bookmarks.length === 0;
  const data = resources.filter((r) => bookmarks.bookmarks.includes(r.id));

  const goToResources = () => dispatch(updateView({ view: VIEW.resources }));

  if (!isAuthenticated) {
    return (
      <div
        className={cx(styles.container, {
          [styles.isActive]: currentMobileView === VIEW.bookmarks,
        })}
      >
        <Placeholder />
      </div>
    );
  }

  return (
    <div
      className={cx(styles.container, {
        [styles.isActive]: currentMobileView === VIEW.bookmarks,
      })}
    >
      <Toolbar
        title="Bookmarks"
        rightAction={<BackAction onClick={goToResources} />}
      />
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
