import Api from '~/services/api';

export const FETCH_BOOKMARKS = 'FETCH_BOOKMARKS';
export const FETCH_BOOKMARKS_SUCCESS = 'FETCH_BOOKMARKS_SUCCESS';
export const FETCH_BOOKMARKS_ERROR = 'FETCH_BOOKMARKS_ERROR';

export const CREATE_BOOKMARK_SUCCESS = 'CREATE_BOOKMARK_SUCCESS';
export const REMOVE_BOOKMARK_SUCCESS = 'REMOVE_BOOKMARK_SUCCESS';

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

const createBookmarkSuccess = ({ bookmark }) => ({
  type: CREATE_BOOKMARK_SUCCESS,
  payload: {
    bookmark,
  },
});

const removeBookmarkSuccess = ({ bookmark }) => ({
  type: REMOVE_BOOKMARK_SUCCESS,
  payload: {
    bookmark,
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

export const createBookmark =
  ({ user, resource, token }) =>
  async (dispatch) => {
    dispatch(fetchBookmarksRequest());
    try {
      const response = await Api.post(
        `/api/v1/users/${user}/bookmarks`,
        { body: { resource_id: resource } },
        token
      );
      dispatch(createBookmarkSuccess({ bookmark: response }));
    } catch (e) {
      dispatch(fetchBookmarksError(e));
    }
  };

export const removeBookmark =
  ({ user, resource, token }) =>
  async (dispatch) => {
    dispatch(fetchBookmarksRequest());
    try {
      await Api.delete(
        `/api/v1/users/${user}/bookmarks/${resource}`,
        {},
        token
      );
      dispatch(removeBookmarkSuccess({ bookmark: { resource_id: resource } }));
    } catch (e) {
      dispatch(fetchBookmarksError(e));
    }
  };
