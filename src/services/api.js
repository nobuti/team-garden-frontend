import { serialize } from 'object-to-formdata';

import { API } from '~/config';

const processError = async (response) => {
  const error = new Error();
  const message = response.statusText
    ? `Error ${response.status}: ${response.statusText}`
    : 'Unknown error';
  error.message = message;
  throw error;
};

const handleResponse = (response) => {
  if (response.ok) {
    return response;
  }

  return processError(response);
};

const processResponse = async (response) => response.json();

const request = (url, options) => {
  const { headers, body, method } = options;

  let opts = {
    method,
    headers,
  };

  if (body != null) {
    opts = {
      ...opts,
      body: serialize(body, { indices: true }),
    };
  }
  const endpoint = `${API}${url}`;
  return fetch(endpoint, opts).then(handleResponse).then(processResponse);
};

const buildRequest =
  (method) =>
  (url, options = {}, token) => {
    let headers = {
      ...options.headers,
    };

    if (token != null) {
      headers = {
        ...headers,
        Bearer: token,
      };
    }

    return request(url, {
      ...options,
      headers,
      method,
    });
  };

export default {
  get: buildRequest('GET'),
  post: buildRequest('POST'),
  put: buildRequest('PUT'),
  patch: buildRequest('PATCH'),
  delete: buildRequest('DELETE'),
};
