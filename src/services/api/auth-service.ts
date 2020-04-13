import Axios from 'axios';
import Config from '@/config';

export default class AuthService {
  static login(username: string, password: string) {
    Axios.post(`${Config.BASE_API_URL}/auth`, {
      username,
      password,
    });
  }
}
