import UserRole from '@/entities/enums/user-role';

interface UserInfoResponseDto {
  userId: number,
  role: UserRole,
  avatar?: string,
  fullName: string,
}

export default UserInfoResponseDto;
