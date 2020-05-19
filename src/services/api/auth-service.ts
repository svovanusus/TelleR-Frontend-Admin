import Axios from 'axios';
import Config from '@/config';

import AuthResponeDto from '@/entities/dto/response/auth-response-dto';
import SignupRequestDto from '@/entities/dto/request/signup-request-dto';
import SignupResponseDto from '@/entities/dto/response/signup-response-dto';

export default class AuthService {
  static login(username: string, password: string) {
    return Axios.post<AuthResponeDto>(`${Config.BASE_API_URL}/auth`, {
      username,
      password,
    });
  }

  static signup(data: SignupRequestDto) {
    return Axios.post<SignupResponseDto>(`${Config.BASE_API_URL}/auth/signup`, data);
  }
}
