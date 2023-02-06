import fetchJson from './fetchJson';

interface Payload {
  expectedSequenceIndex: number;
  gameToken: string;
  letters: string;
  player: number;
}

interface Response {
  letters: string;
  active_player: number;
  sequence_index: number;
  winner: number;
}

const exchange = async ({ expectedSequenceIndex, gameToken, letters, player }: Payload): Promise<Response> => {
  return fetchJson<Response>('http://localhost/wordhex/api/exchange', {
    method: 'POST',
    /* eslint-disable-next-line camelcase */
    body: JSON.stringify({
      /* eslint-disable-next-line camelcase */
      expected_sequence_index: expectedSequenceIndex,
      /* eslint-disable-next-line camelcase */
      game_token: gameToken,
      letters,
      player,
    }),
  });
};

export default exchange;
