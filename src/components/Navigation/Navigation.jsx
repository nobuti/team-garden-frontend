import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';

import Header from '~/components/Header';
import Filter from '~/components/Filter';
import User from '~/components/User';
import { updateView } from '~/store/slices/view/actions';
import { VIEW } from '~/config';

import styles from './styles.module.css';

const Navigation = () => {
  const dispatch = useDispatch();
  const currentMobileView = useSelector((state) => state.view.current);
  const handleCloseMenu = () => dispatch(updateView({ view: VIEW.resources }));

  return (
    <nav
      className={cx(styles.container, {
        [styles.isActive]: currentMobileView === VIEW.menu,
      })}
    >
      <Header onCloseMenu={handleCloseMenu} />
      <Filter />
      <User />
    </nav>
  );
};

export default Navigation;
