import UserSimpleDto from '../user-simple-dto';

interface BlogListItemResponseDto {
  id: number,
  title: string,
  author: UserSimpleDto,
}

export default BlogListItemResponseDto;
