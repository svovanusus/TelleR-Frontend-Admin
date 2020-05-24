import UserSimpleDto from '../user-simple-dto';

interface BlogListItemResponseDto {
  id: number,
  title: string,
  author: UserSimpleDto,
  postsCount: number,
}

export default BlogListItemResponseDto;
