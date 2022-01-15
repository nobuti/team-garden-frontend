// eslint-disable-next-line import/prefer-default-export
export const format = (date) => new Date(date).toISOString().slice(0, 10);
