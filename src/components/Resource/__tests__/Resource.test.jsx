/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import * as Auth0 from '@auth0/auth0-react';
import { screen } from '@testing-library/react';

import { createSlice } from '~/services/store';
import user from '~/store/slices/user/reducer';
import bookmarks from '~/store/slices/bookmarks/reducer';
import { renderWithProvider } from '~/config/tests/helpers';
import Resource from '~/components/Resource';
import { ACTION, FETCH } from '~/config';

let mock;
const context = {
  isAuthenticated: false,
};
const reducers = [user, bookmarks].reduce(
  (memo, r) => ({
    ...memo,
    [r.name]: createSlice(r.initialState, r.handlers),
  }),
  {}
);

const defaultProps = {
  id: 21,
  url: 'https://wadus.io/ugly-sweater-remix',
  category: 'tutorial',
  title: 'Building an Ugly Sweater Photo Booth With Remix',
  description:
    'Overview of an ugly sweater photo booth that was built using Remix and other dev',
  created_at: '2022-01-17T16:42:29.334Z',
  action: ACTION.save,
};

const initialState = {
  user: {
    data: {
      id: 1,
    },
  },
  bookmarks: {
    status: FETCH.status.success,
  },
};

describe('Resource', () => {
  beforeEach(() => {
    mock = jest.spyOn(Auth0, 'useAuth0').mockReturnValue(context);
  });

  test('it should render properly', () => {
    renderWithProvider(<Resource {...defaultProps} />, {
      reducers,
      initialState,
    });

    expect(screen.getByText(defaultProps.category)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText('wadus.io')).toBeInTheDocument();
    expect(screen.getByText('2022-01-17')).toBeInTheDocument();

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('it should render action if authenticated', () => {
    mock.mockReturnValue({
      ...context,
      isAuthenticated: true,
    });

    renderWithProvider(<Resource {...defaultProps} />, {
      reducers,
      initialState,
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('it should render action add bookmark properly', () => {
    mock.mockReturnValue({
      ...context,
      isAuthenticated: true,
    });

    renderWithProvider(<Resource {...defaultProps} />, {
      reducers,
      initialState,
    });

    expect(screen.getByTestId('save-resource')).toBeInTheDocument();
  });

  test('it should render action remove bookmark properly', () => {
    mock.mockReturnValue({
      ...context,
      isAuthenticated: true,
    });

    const props = {
      ...defaultProps,
      action: ACTION.remove,
    };

    renderWithProvider(<Resource {...props} />, {
      reducers,
      initialState,
    });

    expect(screen.getByTestId('remove-resource')).toBeInTheDocument();
  });
});
