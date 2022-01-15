import { FETCH } from '~/config';
import { CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_ERROR } from './actions';

export const INITIAL_STATE = {
  status: FETCH.status.idle,
  data: null,
  error: null,
};

const createUser = (state) => ({
  ...state,
  status: FETCH.status.fetching,
  error: null,
});

const createUserSuccess = (state, action) => ({
  data: action.payload.user,
  status: FETCH.status.success,
  error: null,
});

const createUserError = (state, action) => ({
  ...state,
  status: FETCH.status.failed,
  error: action.payload.error,
});

export default {
  name: 'user',
  initialState: INITIAL_STATE,
  handlers: {
    [CREATE_USER]: createUser,
    [CREATE_USER_SUCCESS]: createUserSuccess,
    [CREATE_USER_ERROR]: createUserError,
  },
};
