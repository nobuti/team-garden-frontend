import { FILTER_BY } from './actions';

export const INITIAL_STATE = {
  current: null,
};

const filter = (state, action) => ({
  ...state,
  current: action.payload.filter,
});

export default {
  name: 'filter',
  initialState: INITIAL_STATE,
  handlers: {
    [FILTER_BY]: filter,
  },
};
