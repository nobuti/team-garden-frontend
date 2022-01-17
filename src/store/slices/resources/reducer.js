import { FETCH } from '~/config';
import {
  FETCH_RESOURCES,
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_ERROR,
} from './actions';

export const INITIAL_STATE = {
  status: FETCH.status.idle,
  resources: [],
  error: null,
};

const fetchResources = (state) => ({
  ...state,
  status: FETCH.status.fetching,
  error: null,
});

const fetchResourcesSuccess = (state, action) => ({
  resources: action.payload.resources,
  status: FETCH.status.success,
  error: null,
});

const fetchResourcesError = (state, action) => ({
  ...state,
  status: FETCH.status.failed,
  error: action.payload.error,
});

export default {
  name: 'resources',
  initialState: INITIAL_STATE,
  handlers: {
    [FETCH_RESOURCES]: fetchResources,
    [FETCH_RESOURCES_SUCCESS]: fetchResourcesSuccess,
    [FETCH_RESOURCES_ERROR]: fetchResourcesError,
  },
};
