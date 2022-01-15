import { VIEW } from '~/config';
import { UPDATE_VIEW } from './actions';

export const INITIAL_STATE = {
  view: VIEW.resources,
};

const updateView = (state, action) => ({
  ...state,
  view: action.payload.view,
});

export default {
  name: 'view',
  initialState: INITIAL_STATE,
  handlers: {
    [UPDATE_VIEW]: updateView,
  },
};
