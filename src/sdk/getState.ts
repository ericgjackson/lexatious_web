import fetchJson from './fetchJson';

interface Payload {
  deviceID: string;
  gameToken: string;
  username?: string;
}

interface Response {
  active_player: number;
  conceder: number;
  last_action: string;
  last_changes: number[];
  letters: string;
  occupiers: string;
  opp_username: string;
  player: number,
  rack: string;
  sequence_index: number;
  winner: number;
}

const getState = async ({ deviceID, gameToken, username }: Payload): Promise<Response> => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const body: {[k: string]: any} = {
    /* eslint-disable-next-line camelcase */
    device_id: deviceID,
    /* eslint-disable-next-line camelcase */
    game_token: gameToken,
  };
  if (username) {
    body.username = username;
  }
  return fetchJson<Response>('http://localhost/wordhex/api/get_state', {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export default getState;
