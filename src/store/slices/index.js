import { createSlice } from '~/services/store';
import view from '~/store/slices/view/reducer';
import resources from '~/store/slices/resources/reducer';

export default [view, resources].reduce(
  (memo, r) => ({
    ...memo,
    [r.name]: createSlice(r.initialState, r.handlers),
  }),
  {}
);
