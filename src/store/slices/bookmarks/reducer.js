import { FETCH } from '~/config';
import {
  FETCH_BOOKMARKS,
  FETCH_BOOKMARKS_SUCCESS,
  FETCH_BOOKMARKS_ERROR,
} from './actions';

export const INITIAL_STATE = {
  status: FETCH.status.idle,
  bookmarks: [],
  error: null,
};

const fetchBookmarks = (state) => ({
  ...state,
  status: FETCH.status.fetching,
  error: null,
});

const fetchBookmarksSuccess = (state, action) => {
  const bookmarks = action.payload.bookmarks.map((b) => b.resource_id);
  return {
    bookmarks,
    status: FETCH.status.success,
    error: null,
  };
};

const fetchBookmarksError = (state, action) => ({
  ...state,
  status: FETCH.status.failed,
  error: action.payload.error,
});

export default {
  name: 'bookmarks',
  initialState: INITIAL_STATE,
  handlers: {
    [FETCH_BOOKMARKS]: fetchBookmarks,
    [FETCH_BOOKMARKS_SUCCESS]: fetchBookmarksSuccess,
    [FETCH_BOOKMARKS_ERROR]: fetchBookmarksError,
  },
};
