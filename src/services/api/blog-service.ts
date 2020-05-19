import Axios from 'axios';
import Config from '@/config';
import BlogListItemResponseDto from '@/entities/dto/response/blog-list-item-response-dto';
import CreateBlogRequestDto from '@/entities/dto/request/create-blog-request-dto';

const BLOG_CONTROLLER_PATH = 'blogs';

export default class BlogService {
  static getAll() {
    return Axios.get<BlogListItemResponseDto[]>(`${Config.BASE_API_URL}/${BLOG_CONTROLLER_PATH}`);
  }

  static get(blogId: number) {
    return Axios.get(`${Config.BASE_API_URL}/${BLOG_CONTROLLER_PATH}/byId`, {
      params: {
        blogId,
      },
    });
  }

  static getByName(blogName: string) {
    return Axios.get(`${Config.BASE_API_URL}/${BLOG_CONTROLLER_PATH}/byName`, {
      params: {
        blogName,
      },
    });
  }

  static createNew(blog: CreateBlogRequestDto) {
    return Axios.post<BlogListItemResponseDto>(`${Config.BASE_API_URL}/${BLOG_CONTROLLER_PATH}/create`, blog);
  }
}
