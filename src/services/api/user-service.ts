import Axios from 'axios';
import Config from '@/config';
import UserInfoResponseDto from '@/entities/dto/response/user-info-response-dto';
import SignupResponseDto from '@/entities/dto/response/signup-response-dto';
import UserInfoForEditResponseDto from '@/entities/dto/response/user-info-for-edit-response';
import UpdateUserInfoRequestDto from '@/entities/dto/request/update-user-info-request-dto';
import UpdatePasswordRequestDto from '@/entities/dto/request/update-password-request-dto';
import FileUploadResponseDto from '@/entities/dto/response/file-upload-response-dto';

const USER_CONTROLLER_PATH = 'users';

export default class UserService {
  static getUserInfo() {
    return Axios.get<UserInfoResponseDto>(`${Config.BASE_API_URL}/${USER_CONTROLLER_PATH}/info`);
  }

  static getUserInfoForEdit() {
    return Axios.get<UserInfoForEditResponseDto>(`${Config.BASE_API_URL}/${USER_CONTROLLER_PATH}/infoForEdit`);
  }

  static updateUserInfo(data: UpdateUserInfoRequestDto) {
    return Axios.put<SignupResponseDto>(`${Config.BASE_API_URL}/${USER_CONTROLLER_PATH}/updateInfo`, data);
  }

  static changeUserPassword(data: UpdatePasswordRequestDto) {
    return Axios.put<SignupResponseDto>(`${Config.BASE_API_URL}/${USER_CONTROLLER_PATH}/changePassword`, data);
  }

  static uploadAvatar(file: any) {
    const data = new FormData();
    data.append('file', file);
    return Axios.post<FileUploadResponseDto>(`${Config.BASE_API_URL}/${USER_CONTROLLER_PATH}/uploadAvatar`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
