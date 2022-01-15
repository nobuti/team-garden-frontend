import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchResources } from '~/store/slices/resources/actions';
import { createUser } from '~/store/slices/user/actions';
import { fetchBookmarks } from '~/store/slices/bookmarks/actions';

const Container = ({ children }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const apiUser = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResources());
  }, []);

  useEffect(() => {
    if (user?.email && apiUser == null) {
      const { name, email } = user;
      dispatch(createUser({ name, email }));
    }
  }, [user]);

  useEffect(() => {
    async function fethMyBookmarks() {
      const token = await getAccessTokenSilently();
      dispatch(fetchBookmarks({ id: apiUser.id, token }));
    }

    if (apiUser != null) {
      fethMyBookmarks();
    }
  }, [apiUser, dispatch]);

  return children;
};

export default Container;
