import Api from '~/services/api';

export const FETCH_RESOURCES = 'FETCH_RESOURCES';
export const FETCH_RESOURCES_SUCCESS = 'FETCH_RESOURCES_SUCCESS';
export const FETCH_RESOURCES_ERROR = 'FETCH_RESOURCES_ERROR';

const fetchResourcesRequest = () => ({
  type: FETCH_RESOURCES,
});

const fetchResourcesSuccess = ({ resources }) => ({
  type: FETCH_RESOURCES_SUCCESS,
  payload: {
    resources,
  },
});

const fetchResourcesError = (e) => ({
  type: FETCH_RESOURCES_ERROR,
  payload: {
    error: e,
  },
});

export const fetchResources = () => async (dispatch) => {
  dispatch(fetchResourcesRequest());
  try {
    const response = await Api.get(`/api/v1/resources`);
    dispatch(fetchResourcesSuccess({ resources: response }));
  } catch (e) {
    dispatch(fetchResourcesError(e));
  }
};
