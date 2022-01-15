import { createSlice } from '~/services/store';
import view from '~/store/slices/view/reducer';
import resources from '~/store/slices/resources/reducer';
import user from '~/store/slices/user/reducer';

export default [view, resources, user].reduce(
  (memo, r) => ({
    ...memo,
    [r.name]: createSlice(r.initialState, r.handlers),
  }),
  {}
);
