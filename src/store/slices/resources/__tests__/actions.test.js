import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createServer, Response } from 'miragejs';

import { API } from '~/config';
import {
  fetchResources,
  FETCH_RESOURCES,
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_ERROR,
} from '~/store/slices/resources/actions';
import { INITIAL_STATE } from '~/store/slices/resources/reducer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Bookmarks actions', () => {
  let server;
  const payload = [
    {
      id: 3,
      url: 'https://github.com/elkevinwolf/dynapic',
      category: 'example',
      title: 'elkevinwolf/dynapic',
      description: 'Dynamic Image Generator as a Service',
      created_at: '2022-01-17T16:42:28.891Z',
      updated_at: '2022-01-17T16:42:28.891Z',
    },
    {
      id: 2,
      url: 'https://github.com/jacobPARIS/remix-cloudflare-prisma',
      category: 'example',
      title: 'jacobPARIS/remix-cloudflare-prisma',
      description:
        'An example of prisma working on cloudflare pages with Remix',
      created_at: '2022-01-17T16:42:28.868Z',
      updated_at: '2022-01-17T16:42:28.868Z',
    },
    {
      id: 1,
      url: 'https://github.com/mzaien/remix-nextui-vercel',
      category: 'example',
      title: 'mzaien/remix-nextui-vercel',
      description: 'A template for Remix and Next-ui',
      created_at: '2022-01-17T16:42:28.844Z',
      updated_at: '2022-01-17T16:42:28.844Z',
    },
  ];

  beforeEach(() => {
    server = createServer({
      routes() {
        this.get(`${API}/api/v1/resources`, () => payload);
      },
    });

    server.logging = false;
  });

  afterEach(() => {
    server.shutdown();
  });

  it('creates FETCH_RESOURCES_SUCCESS action when fetching resources successfully', async () => {
    const expectedActions = [
      {
        type: FETCH_RESOURCES,
      },
      expect.objectContaining({
        type: FETCH_RESOURCES_SUCCESS,
        payload: {
          resources: payload,
        },
      }),
    ];

    const store = mockStore(INITIAL_STATE);
    await store.dispatch(fetchResources());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates FETCH_RESOURCES_ERROR action when fetching resources fails', async () => {
    server.get(
      `${API}/api/v1/resources`,
      () => new Response(401, { 'Content-Type': 'application/json' }, {})
    );

    const expectedActions = [
      {
        type: FETCH_RESOURCES,
      },
      {
        type: FETCH_RESOURCES_ERROR,
        payload: {
          error: expect.objectContaining({
            message: 'Error 401: Unauthorized',
          }),
        },
      },
    ];

    const store = mockStore(INITIAL_STATE);
    await store.dispatch(fetchResources());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
