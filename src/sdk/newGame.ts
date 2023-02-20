import fetchJson from './fetchJson';

interface Payload {
  deviceID: string;
  opponentGoesFirst: boolean;
  opponentName: string;
  username: string;
}

interface Response {
  rack: string;
  player: number;
  active_player: number;
  game_token: string;
  sequence_index: number;
}

const newGame = async ({ deviceID, opponentGoesFirst, opponentName, username }: Payload): Promise<Response> => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const body: {[k: string]: any} = {
    /* eslint-disable-next-line camelcase */
    device_id: deviceID,
    opponent: opponentName,
    /* eslint-disable-next-line camelcase */
    num_rows: 15,
    /* eslint-disable-next-line camelcase */
    num_cols: 15,
    /* eslint-disable-next-line camelcase */
    we_go_first: !opponentGoesFirst,
  };
  if (username) {
    body.username = username;
  }
  return fetchJson<Response>('/api/new_game', {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export default newGame;
