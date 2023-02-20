import fetchJson from './fetchJson';

interface Payload {
  gameToken: string;
  player: number;
}

interface Response {
  active_player: number;
  last_action: string;
  last_changes: number[];
  letters: string;
  occupiers: string;
  sequence_index: number;
  winner: number;
}

const getUpdate = async ({ gameToken, player }: Payload): Promise<Response> => {
  return fetchJson<Response>('/api/get_update', {
    method: 'POST',
    body: JSON.stringify({
      /* eslint-disable-next-line camelcase */
      game_token: gameToken,
      player,
    }),
  });
};

export default getUpdate;
