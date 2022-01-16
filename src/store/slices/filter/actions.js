export const FILTER_BY = 'FILTER_BY';

export const filterBy = ({ filter }) => ({
  type: FILTER_BY,
  payload: {
    filter,
  },
});
