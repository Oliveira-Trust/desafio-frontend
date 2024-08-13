export const makeRequest = async (
  url: string,
  options = {},
  customHeaders = {}
) => {
  return await fetch(url, {
    ...options,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      ...customHeaders,
    },
  });
};
