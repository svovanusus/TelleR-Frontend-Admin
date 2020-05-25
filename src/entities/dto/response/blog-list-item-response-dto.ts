import UserSimpleDto from '../user-simple-dto';

interface BlogListItemResponseDto {
  id: number,
  name: string,
  title: string,
  author: UserSimpleDto,
  postsCount: number,
}

export default BlogListItemResponseDto;
