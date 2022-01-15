/* eslint-disable import/prefer-default-export */
export const host = (url) => {
  const { hostname } = new URL(url);
  return hostname;
};
