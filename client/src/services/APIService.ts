import { API_URL } from '../conf/conf';

export default class APIService {
  async post(url: string, infos: object): Promise<any> {
    const response = await fetch(API_URL + '/api/' + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...infos }),
    });
    const data = await response.json();
    return data;
  }
}
