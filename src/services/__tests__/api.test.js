import { createServer, Response } from 'miragejs';
import FormDataParser from 'form-data-to-object';

import ApiClient from '~/services/api';
import { API } from '~/config';

describe('ApiClient', () => {
  let server;

  const defaultResponse = {
    users: [
      { id: 1, username: 'Wadus' },
      { id: 3, username: 'Jane Wallaby' },
      { id: 2, username: 'John Doe' },
    ],
  };

  beforeEach(() => {
    server = createServer({
      routes() {
        const createUpdateHandler = (schema, request) => {
          const attrs = request.requestBody
            ? FormDataParser.toObj(Object.fromEntries(request.requestBody))
            : {};
          const id = request.params.id || 4;
          if (request.requestHeaders.authorization == null) {
            return new Response(
              401,
              { 'Content-Type': 'application/json' },
              {}
            );
          }

          return {
            ...attrs,
            id: +id,
          };
        };

        const showHandler = (schema, request) => {
          const { sort } = request.queryParams;
          if (sort != null) {
            return defaultResponse.users.sort((a, b) =>
              sort === 'asc' ? a.id - b.id : b.id - a.id
            );
          }

          return defaultResponse.users;
        };

        this.get(`${API}/api/users`, showHandler);
        this.post(`${API}/api/users`, createUpdateHandler);
        this.put(`${API}/api/users/:id`, createUpdateHandler);
        this.patch(`${API}/api/users/:id`, createUpdateHandler);
        this.delete(`${API}/api/users/:id`, createUpdateHandler);
      },
    });
    server.logging = false;
  });

  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should handle response properly', async () => {
      const response = await ApiClient.get(`/api/users`);
      expect(response).toEqual(defaultResponse.users);
    });
  });

  describe('post', () => {
    it('should handle response properly', async () => {
      const response = await ApiClient.post(
        `/api/users`,
        {
          body: {
            username: 'Supply admin',
          },
        },
        'wadus'
      );
      expect(response).toEqual({ id: 4, username: 'Supply admin' });
    });

    it('should raises if token is missing', async () => {
      try {
        await ApiClient.post(`/api/users`, {
          body: {
            username: 'Supply admin',
          },
        });
      } catch (e) {
        expect(e.message).toMatch(/401/);
      }
    });
  });

  describe('put', () => {
    it('should handle response properly', async () => {
      const response = await ApiClient.put(
        `/api/users/1`,
        {
          body: {
            username: 'Supply admin',
          },
        },
        'token'
      );
      expect(response).toEqual({ id: 1, username: 'Supply admin' });
    });

    it('should raises if token is missing', async () => {
      try {
        await ApiClient.put(`/api/users/1`, {
          body: {
            username: 'Supply admin',
          },
        });
      } catch (e) {
        expect(e.message).toMatch(/401/);
      }
    });
  });

  describe('patch', () => {
    it('should handle response properly', async () => {
      const response = await ApiClient.patch(
        `/api/users/1`,
        {
          body: {
            username: 'Supply admin',
          },
        },
        'token'
      );
      expect(response).toEqual({ id: 1, username: 'Supply admin' });
    });

    it('should raises if token is missing', async () => {
      try {
        await ApiClient.patch(`/api/users/1`, {
          body: {
            username: 'Supply admin',
          },
        });
      } catch (e) {
        expect(e.message).toMatch(/401/);
      }
    });
  });

  describe('delete', () => {
    it('should handle response properly', async () => {
      const response = await ApiClient.delete(`/api/users/1`, {}, 'token');
      expect(response).toEqual({ id: 1 });
    });

    it('should raises if token is missing', async () => {
      try {
        await ApiClient.patch(`/api/users/1`, {});
      } catch (e) {
        expect(e.message).toMatch(/401/);
      }
    });
  });

  describe('errors', () => {
    it('should handle errors properly', async () => {
      server.get(
        `/users`,
        () => new Response(404, { 'Content-Type': 'application/json' }, {})
      );

      try {
        await ApiClient.get(`/api/users`);
      } catch (e) {
        expect(e.message).toBeDefined();
        expect(e.message).toEqual('Error 404: Not Found');
      }
    });

    it('should handle 422 properly', async () => {
      server.get(
        `/users`,
        () =>
          new Response(
            422,
            { 'Content-Type': 'application/json' },
            { errors: ['Unprocessable entity', 'Wadus wadus error'] }
          )
      );

      try {
        await ApiClient.get(`/api/users`);
      } catch (e) {
        expect(e.message).toBeDefined();
        expect(e.message).toEqual([
          'Unprocessable entity',
          'Wadus wadus error',
        ]);
      }
    });
  });
});
