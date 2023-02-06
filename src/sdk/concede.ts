import fetchJson from './fetchJson';

interface Payload {
  expectedSequenceIndex: number;
  gameToken: string;
  player: number;
}

interface Response {
  sequence_index: number;
}

const concede = async ({ expectedSequenceIndex, gameToken, player }: Payload): Promise<Response> => {
  return fetchJson<Response>('http://localhost/wordhex/api/concede', {
    method: 'POST',
    /* eslint-disable-next-line camelcase */
    body: JSON.stringify({
      /* eslint-disable-next-line camelcase */
      expected_sequence_index: expectedSequenceIndex,
      /* eslint-disable-next-line camelcase */
      game_token: gameToken,
      player,
    }),
  });
};

export default concede;
