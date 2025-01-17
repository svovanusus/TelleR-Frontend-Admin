import UserSimpleDto from '../user-simple-dto';

interface PostListItemResponseDto {
  id: number,
  title: string,
  description: string,
  content: string,
  author: UserSimpleDto,
  createDate: Date,
  publishDate: Date,
}

export default PostListItemResponseDto;
