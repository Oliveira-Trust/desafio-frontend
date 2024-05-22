export const makeRequest = async (
  url = '',
  handleCors = false,
  options = {}
) => {
  let customHeaders = {};
  if (handleCors)
    customHeaders = {
      'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers':
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    };

  return await fetch(url, {
    ...options,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      ...customHeaders,
    },
  });
};
