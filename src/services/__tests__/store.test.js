import { createSlice } from '~/services/store';

describe('createSlice', () => {
  const initialState = {};
  const handlers = {
    WADUS: jest.fn().mockReturnValue({ data: 'wadus' }),
  };

  const reducer = createSlice(initialState, handlers);

  it('should return state properly', () => {
    expect(reducer(initialState, { type: 'FOO' })).toEqual(initialState);
  });

  it('should call handler properly', () => {
    const action = {
      type: 'WADUS',
      payload: 'wadus wadus',
    };

    const state = {
      data: null,
    };

    const result = reducer(state, action);

    expect(handlers.WADUS).toHaveBeenCalledWith(state, action);
    expect(result).toEqual({ data: 'wadus' });
  });
});
