import fetchJson from './fetchJson';

interface Payload {
  deviceID: string;
}

interface SingleOpponentStats {
  opponent: string;
  wins: number;
  losses: number;
}

interface Response {
  opp_stats: SingleOpponentStats[];
}

const getStats = async ({ deviceID }: Payload): Promise<Response> => {
  return fetchJson<Response>('http://localhost/wordhex/api/get_stats', {
    method: 'POST',
    /* eslint-disable-next-line camelcase */
    body: JSON.stringify({ device_id: deviceID }),
  });
};

export default getStats;
