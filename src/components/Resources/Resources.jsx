/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';

import { ACTION, FETCH, VIEW } from '~/config';
import Toolbar from '~/components/Toolbar';
import Loading from '~/components/Loading';
import Resource from '~/components/Resource';
import List from '~/components/List';
import { updateView } from '~/store/slices/view/actions';

import { useAuth0 } from '@auth0/auth0-react';
import styles from './styles.module.css';

const MenuAction = ({ onClick }) => (
  <button
    className={cx(styles.button, styles.menu)}
    type="button"
    onClick={onClick}
  >
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

const BookmarksAction = ({ onClick }) => (
  <button
    className={cx(styles.button, styles.bookmarks)}
    type="button"
    onClick={onClick}
  >
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
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const currentMobileView = useSelector((state) => state.view.current);
  const currentFilter = useSelector((state) => state.filter.current);
  const resources = useSelector((state) => state.resources);
  const bookmarks = useSelector((state) => state.bookmarks.bookmarks);
  let data = resources.resources.filter((r) => !bookmarks.includes(r.id));
  if (currentFilter != null) {
    data = data.filter((r) => r.category === currentFilter);
  }

  const isLoading =
    resources.status === FETCH.status.fetching &&
    resources.resources.length === 0;

  const showSection = (view) => dispatch(updateView({ view }));

  return (
    <div
      className={cx(styles.container, {
        [styles.isActive]: currentMobileView === VIEW.resources,
      })}
    >
      <Toolbar
        title="Discover"
        leftAction={<MenuAction onClick={() => showSection(VIEW.menu)} />}
        rightAction={
          isAuthenticated ? (
            <BookmarksAction onClick={() => showSection(VIEW.bookmarks)} />
          ) : null
        }
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
