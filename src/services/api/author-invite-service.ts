import Axios from 'axios';
import Config from '@/config';
import AuthorInviteNotificationsResponseDto from '@/entities/dto/response/author-invite-notifications-response-dto';
import CreateAuthorInviteRequestDto from '@/entities/dto/request/create-author-invite-request-dto';
import CreateAuthorInviteResponseDto from '@/entities/dto/response/create-author-invite-response-dto';

const AUTHOR_INVITE_CONTROLLER_PATH = 'authorInvites';

export default class AuthorInviteService {
  static getInviteNotifications() {
    return Axios.get<AuthorInviteNotificationsResponseDto>(`${Config.BASE_API_URL}/${AUTHOR_INVITE_CONTROLLER_PATH}`);
  }

  static createInvite(data: CreateAuthorInviteRequestDto) {
    return Axios.post<CreateAuthorInviteResponseDto>(`${Config.BASE_API_URL}/${AUTHOR_INVITE_CONTROLLER_PATH}/create`, data);
  }

  static answerInvite(inviteId: number, isApprove: boolean) {
    return Axios.put<boolean>(`${Config.BASE_API_URL}/${AUTHOR_INVITE_CONTROLLER_PATH}/answer`, null, {
      params: {
        inviteId,
        isApprove,
      },
    });
  }

  static closeInvite(inviteId: number) {
    return Axios.put<boolean>(`${Config.BASE_API_URL}/${AUTHOR_INVITE_CONTROLLER_PATH}/close`, null, {
      params: {
        inviteId,
      },
    });
  }
}
