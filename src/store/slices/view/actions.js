export const UPDATE_VIEW = 'UPDATE_VIEW';

export const updateView = ({ view, value }) => ({
  type: UPDATE_VIEW,
  payload: {
    view,
    value,
  },
});
