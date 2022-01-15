import Api from '~/services/api';

export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';

const createUserRequest = () => ({
  type: CREATE_USER,
});

const createUserSuccess = ({ user }) => ({
  type: CREATE_USER_SUCCESS,
  payload: {
    user,
  },
});

const createUserError = (e) => ({
  type: CREATE_USER_ERROR,
  payload: {
    error: e,
  },
});

export const createUser = (user) => async (dispatch) => {
  dispatch(createUserRequest());
  try {
    const response = await Api.post(`/api/v1/users`, { body: user });
    dispatch(createUserSuccess({ user: response }));
  } catch (e) {
    dispatch(createUserError(e));
  }
};
