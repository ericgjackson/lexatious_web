import fetch from './fetch';

const fetchJson = async <T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> => {
  const response = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      ...init?.headers,
    },
  });

  return response.json();
};

export default fetchJson;
