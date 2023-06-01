import { User } from '../Interfaces/Interfaces';
import APIService from './APIService';
import { RegisterLoginResponse } from '../Interfaces/Interfaces';

export default class UserService extends APIService {
  // register new user
  async register({ userName, password }: User): Promise<RegisterLoginResponse> {
    return await this.post('users/register', { userName, password });
  }

  // login user
  async login({ userName, password }: User): Promise<RegisterLoginResponse> {
    return await this.post('users/login', { userName, password });
  }

  // check user token
  //   async getInfo(token: string): Promise<> {
  //     return await this.post('users/tokeninfo/', { token });
  //   }
}
