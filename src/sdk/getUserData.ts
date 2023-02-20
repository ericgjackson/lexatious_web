import fetchJson from './fetchJson';

interface Payload {
  deviceID: string;
  username: string;
}

interface Game {
  accepted: boolean;
  active_player: number;
  initiator?: number;
  opp_username: string;
  player: number;
  token: string;
  winner: number;
}

interface Response {
  games: Game[];
}

const getUserData = async ({ deviceID, username }: Payload): Promise<Response> => {
  return fetchJson<Response>('/api/get_user_data', {
    method: 'POST',
    body: JSON.stringify({
      /* eslint-disable-next-line camelcase */
      device_id: deviceID,
      username,
    }),
  });
};

export default getUserData;
