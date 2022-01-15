// eslint-disable-next-line import/prefer-default-export
export const createSlice =
  (initialState, handlers) =>
  (state = initialState, action) => {
    if (handlers[action.type] != null) {
      return handlers[action.type](state, action);
    }
    return state;
  };
