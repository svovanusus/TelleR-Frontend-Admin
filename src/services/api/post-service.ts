import Axios from 'axios';
import Config from '@/config';
import CreatePostRequestDto from '@/entities/dto/request/create-post-request-dto';
import PostListItemResponseDto from '@/entities/dto/response/post-list-item-response-dto';
import PostInfoForEditDto from '@/entities/dto/response/post-info-for-edit-dto';

const POST_CONTROLLER_PATH = 'posts';

export default class PostService {
  static getForEdit(postId: number) {
    return Axios.get<PostInfoForEditDto>(`${Config.BASE_API_URL}/${POST_CONTROLLER_PATH}/getForEdit`, {
      params: {
        postId,
      },
    });
  }

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

  static update(post: CreatePostRequestDto) {
    return Axios.put<PostListItemResponseDto>(`${Config.BASE_API_URL}/${POST_CONTROLLER_PATH}/update`, post);
  }

  static publish(postId: number) {
    return Axios.put<boolean>(`${Config.BASE_API_URL}/${POST_CONTROLLER_PATH}/publish`, null, {
      params: {
        postId,
      },
    });
  }
}
