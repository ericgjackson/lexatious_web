import fetchJson from './fetchJson';

interface Payload {
  deviceID: string;
}

interface Achievement {
  title: string;
  description: string;
  achieved: boolean;
}

interface Response {
  achievements: Achievement[];
}

const getAchievements = async ({ deviceID }: Payload): Promise<Response> => {
  return fetchJson<Response>('http://localhost/wordhex/api/get_achievements', {
    method: 'POST',
    /* eslint-disable-next-line camelcase */
    body: JSON.stringify({ device_id: deviceID }),
  });
};

export default getAchievements;
