import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Container = ({ children }) => {
  const { user } = useAuth0();

  useEffect(() => {
    if (user?.email) {
      console.log('logged', user);
    }
  }, [user]);

  return children;
};

export default Container;
