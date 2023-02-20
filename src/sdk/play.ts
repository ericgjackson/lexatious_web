import { ChangesJson } from 'ltypes';

import fetchJson from './fetchJson';

interface Payload {
  changes: ChangesJson;
  draw: boolean,
  expectedSequenceIndex: number;
  gameToken: string;
  player: number;
}

interface Response {
  active_player: number;
  letters: string;
  occupiers: string;
  rack: string;
  sequence_index: number;
  winner: number;
}

const play = async ({ changes, draw, expectedSequenceIndex, gameToken, player }: Payload): Promise<Response> => {
  return fetchJson<Response>('/api/play', {
    method: 'POST',
    body: JSON.stringify({
      changes,
      draw,
      /* eslint-disable-next-line camelcase */
      expected_sequence_index: expectedSequenceIndex,
      /* eslint-disable-next-line camelcase */
      game_token: gameToken,
      player,
    }),
  });
};

export default play;
