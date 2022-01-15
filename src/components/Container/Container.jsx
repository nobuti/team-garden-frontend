import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchResources } from '~/store/slices/resources/actions';
import { createUser } from '~/store/slices/user/actions';

const Container = ({ children }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const apiUser = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResources());
  }, []);

  useEffect(() => {
    if (user?.email && apiUser == null) {
      dispatch(createUser(user));
    }
  }, [user]);

  return children;
};

export default Container;
