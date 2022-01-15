import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';

import { fetchResources } from '~/store/slices/resources/actions';

const Container = ({ children }) => {
  const { user } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResources());
  }, []);

  useEffect(() => {
    if (user?.email) {
      console.log('logged', user);
    }
  }, [user]);

  return children;
};

export default Container;
