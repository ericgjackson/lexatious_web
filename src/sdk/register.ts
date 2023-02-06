import fetchJson from './fetchJson';

interface Payload {
  deviceID: string;
  username: string;
}

const register = async ({ deviceID, username }: Payload): Promise<Response> => {
  return fetchJson<Response>('http://localhost/wordhex/api/register', {
    method: 'POST',
    /* eslint-disable-next-line camelcase */
    body: JSON.stringify({ device_id: deviceID, username }),
  });
};

export default register;
