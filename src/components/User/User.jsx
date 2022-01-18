import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import styles from './styles.module.css';

const Profile = ({ name, picture }) => {
  const { logout } = useAuth0();

  return (
    <div data-testid="profile" className={styles.profile}>
      <img className={styles.image} src={picture} alt={name} />

      <div className={styles.user}>
        <h2 className={styles.name}>{name}</h2>
        <button type="button" className={styles.logout} onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
};
const User = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  return (
    <footer className={styles.container}>
      <div className={styles.separator}>
        {isAuthenticated ? (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Profile {...user} />
        ) : (
          <button
            className={styles.button}
            type="button"
            onClick={loginWithRedirect}
          >
            Login with GitHub
          </button>
        )}
      </div>
    </footer>
  );
};

export default User;
