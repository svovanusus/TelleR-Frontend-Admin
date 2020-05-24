import UserRole from '@/entities/enums/user-role';

interface UserInfoResponseDto {
  userId: number,
  role: UserRole,
  fullName: string,
}

export default UserInfoResponseDto;
