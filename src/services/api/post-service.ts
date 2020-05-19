import Axios from 'axios';
import Config from '@/config';
import CreatePostRequestDto from '@/entities/dto/request/create-post-request-dto';
import PostListItemResponseDto from '@/entities/dto/response/post-list-item-response-dto';

const POST_CONTROLLER_PATH = 'posts';

export default class PostService {
  static getForBlog(blogId: number) {
    return Axios.get<PostListItemResponseDto[]>(`${Config.BASE_API_URL}/${POST_CONTROLLER_PATH}/getAllForBlog`, {
      params: {
        blogId,
      },
    });
  }

  static createNew(post: CreatePostRequestDto) {
    return Axios.post<PostListItemResponseDto>(`${Config.BASE_API_URL}/${POST_CONTROLLER_PATH}/create`, post);
  }
}
