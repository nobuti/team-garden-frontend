import Api from '~/services/api';

export const FETCH_BOOKMARKS = 'FETCH_BOOKMARKS';
export const FETCH_BOOKMARKS_SUCCESS = 'FETCH_BOOKMARKS_SUCCESS';
export const FETCH_BOOKMARKS_ERROR = 'FETCH_BOOKMARKS_ERROR';

const fetchBookmarksRequest = () => ({
  type: FETCH_BOOKMARKS,
});

const fetchBookmarksSuccess = ({ bookmarks }) => ({
  type: FETCH_BOOKMARKS_SUCCESS,
  payload: {
    bookmarks,
  },
});

const fetchBookmarksError = (e) => ({
  type: FETCH_BOOKMARKS_ERROR,
  payload: {
    error: e,
  },
});

export const fetchBookmarks =
  ({ id, token }) =>
  async (dispatch) => {
    dispatch(fetchBookmarksRequest());
    try {
      const response = await Api.get(
        `/api/v1/users/${id}/bookmarks`,
        {},
        token
      );
      dispatch(fetchBookmarksSuccess({ bookmarks: response }));
    } catch (e) {
      dispatch(fetchBookmarksError(e));
    }
  };
