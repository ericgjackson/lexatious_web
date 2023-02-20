import fetchJson from './fetchJson';

interface Payload {
  deviceID: string;
}

interface Friend {
  username: string;
  device_id: string;
}

interface Response {
  friends: Friend[];
}

const getFriends = async ({ deviceID }: Payload): Promise<Response> => {
  return fetchJson<Response>('/api/get_friends', {
    method: 'POST',
    /* eslint-disable-next-line camelcase */
    body: JSON.stringify({ device_id: deviceID }),
  });
};

export default getFriends;
