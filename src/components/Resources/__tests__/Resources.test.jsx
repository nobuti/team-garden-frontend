/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import * as Auth0 from '@auth0/auth0-react';
import { screen } from '@testing-library/react';

import { createSlice } from '~/services/store';
import user from '~/store/slices/user/reducer';
import bookmarks from '~/store/slices/bookmarks/reducer';
import view from '~/store/slices/view/reducer';
import filter from '~/store/slices/filter/reducer';
import resources from '~/store/slices/resources/reducer';
import { renderWithProvider } from '~/config/tests/helpers';
import Resources from '~/components/Resources';
import { FETCH, VIEW, CATEGORY } from '~/config';

const context = {
  isAuthenticated: false,
};
const reducers = [user, bookmarks, view, filter, resources].reduce(
  (memo, r) => ({
    ...memo,
    [r.name]: createSlice(r.initialState, r.handlers),
  }),
  {}
);

const resourceCollection = [
  {
    id: 22,
    url: 'https://www.npmjs.com/package/@routes-gen/remix',
    category: 'package',
    title: '@routes-gen/remix',
    description: 'This is package is a routes-gen driver for Remix',
    created_at: '2022-01-17T16:42:29.358Z',
  },
  {
    id: 21,
    url: 'https://blog.noahjohnson.dev/ugly-sweater-remix',
    category: 'tutorial',
    title: 'Building an Ugly Sweater Photo Booth With Remix',
    description:
      'Overview of an ugly sweater photo booth that was built using Remix and other dev',
    created_at: '2022-01-17T16:42:29.334Z',
  },
  {
    id: 20,
    url: 'https://www.youtube.com/watch?v=BT8cPIAUnck',
    category: 'tutorial',
    title: 'All things Remix w/Kent C. Dodds',
    description:
      'Juri Strumpflohner is joined by Kent C. Dodds, Director of Developer Experience ',
    created_at: '2022-01-17T16:42:29.309Z',
  },
  {
    id: 1,
    url: 'https://github.com/aravindballa/hackletter',
    category: 'example',
    title: 'aravindballa/hackletter',
    description: null,
    created_at: '2022-01-17T16:42:29.285Z',
  },
  {
    id: 2,
    url: 'https://www.youtube.com/watch?v=pf9A9nBOnRc',
    category: 'tutorial',
    title: 'How to Debug Remix loaders and actions in VS Code',
    description:
      'This video shows how to configure VS Code to debug your Remix loaders and action',
    created_at: '2022-01-17T16:42:29.261Z',
  },
];

const initialState = {
  user: {
    data: {
      id: 1,
    },
  },
  view: {
    current: VIEW.resources,
  },
  filter: {
    current: null,
  },
  bookmarks: {
    status: FETCH.status.success,
    bookmarks: [1, 2],
  },
  resources: {
    status: FETCH.status.success,
    resources: resourceCollection,
  },
};

describe('Resources', () => {
  let mock;
  beforeEach(() => {
    mock = jest.spyOn(Auth0, 'useAuth0').mockReturnValue(context);
  });

  test('it should render properly', () => {
    renderWithProvider(<Resources />, {
      reducers,
      initialState,
    });

    expect(screen.getAllByTestId('resource')).toHaveLength(
      resourceCollection.length
    );
  });

  test('it should filter bookmarks if authenticated', () => {
    mock.mockReturnValue({
      ...context,
      isAuthenticated: true,
    });

    renderWithProvider(<Resources />, {
      reducers,
      initialState,
    });

    expect(screen.getAllByTestId('resource')).toHaveLength(
      resourceCollection.length - initialState.bookmarks.bookmarks.length
    );
  });

  test('it should render loading state properly', () => {
    renderWithProvider(<Resources />, {
      reducers,
      initialState: {
        ...initialState,
        resources: {
          status: FETCH.status.fetching,
          resources: [],
        },
      },
    });

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('it should render empty state properly', () => {
    renderWithProvider(<Resources />, {
      reducers,
      initialState: {
        ...initialState,
        resources: {
          status: FETCH.status.success,
          resources: [],
        },
      },
    });

    expect(
      screen.getByText(/There are no results to show/)
    ).toBeInTheDocument();
  });

  test('it should filter by category properly', () => {
    const examples = resourceCollection.filter(
      (r) => r.category === CATEGORY.example
    );

    renderWithProvider(<Resources />, {
      reducers,
      initialState: {
        ...initialState,
        filter: {
          current: CATEGORY.example,
        },
      },
    });

    expect(screen.getAllByTestId('resource')).toHaveLength(examples.length);
  });
});
