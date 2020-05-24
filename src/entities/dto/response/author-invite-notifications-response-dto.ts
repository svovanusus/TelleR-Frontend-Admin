import UserSimpleDto from '@/entities/dto/user-simple-dto';

export interface AuthorInviteForReceiverResponseDto {
  inviteId: number,
  sender: UserSimpleDto,
  blogName: string,
}

export interface AuthorInviteNotificationForSenderResponseDto {
  inviteId: number,
  reciever: UserSimpleDto,
  isApproved: boolean,
  blogName: string,
}

interface AuthorInviteNotificationsResponseDto {
  asReceiver: AuthorInviteForReceiverResponseDto,
  asSender: AuthorInviteNotificationForSenderResponseDto,
  message?: string,
}

export default AuthorInviteNotificationsResponseDto;
