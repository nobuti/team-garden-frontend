import { createSlice } from '~/services/store';
import { FETCH } from '~/config';
import {
  FETCH_RESOURCES,
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_ERROR,
} from '~/store/slices/resources/actions';
import resourcesReducer, {
  INITIAL_STATE,
} from '~/store/slices/resources/reducer';

const reducer = createSlice(
  resourcesReducer.initialState,
  resourcesReducer.handlers
);

describe('resources reducer', () => {
  it('should return the initial state properly', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should handle FETCH_RESOURCES action properly', () => {
    expect(
      reducer(undefined, {
        type: FETCH_RESOURCES,
      })
    ).toEqual({
      ...INITIAL_STATE,
      status: FETCH.status.fetching,
    });
  });

  it('should handle FETCH_RESOURCES_SUCCESS action properly', () => {
    const payload = {
      resources: [
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
      ],
    };

    expect(
      reducer(undefined, {
        type: FETCH_RESOURCES_SUCCESS,
        payload,
      })
    ).toEqual(
      expect.objectContaining({
        ...payload,
        status: FETCH.status.success,
        error: null,
      })
    );
  });

  it('should handle FETCH_RESOURCES_ERROR action properly', () => {
    const error = new Error('Wadus');
    expect(
      reducer(undefined, {
        type: FETCH_RESOURCES_ERROR,
        payload: {
          error,
        },
      })
    ).toEqual({
      ...INITIAL_STATE,
      status: FETCH.status.failed,
      error,
    });
  });
});
