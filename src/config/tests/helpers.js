/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// eslint-disable-next-line import/prefer-default-export
export const renderWithProvider = (
  ui,
  { reducers = {}, initialState = {} } = {}
) => {
  const store = createStore(
    combineReducers({ ...reducers }),
    initialState,
    compose(applyMiddleware(thunk))
  );

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
  };
};
