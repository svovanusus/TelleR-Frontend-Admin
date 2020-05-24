import Axios from 'axios';
import Config from '@/config';
import BlogListItemResponseDto from '@/entities/dto/response/blog-list-item-response-dto';
import CreateBlogRequestDto from '@/entities/dto/request/create-blog-request-dto';
import CreateBlogResponseDto from '@/entities/dto/response/create-blog-response-dto';
import BlogNameResponseDto from '@/entities/dto/response/blog-name-response-dto';
import BlogInfoResponseDto from '@/entities/dto/response/blog-info-response.dto';
import UserSimpleDto from '@/entities/dto/user-simple-dto';

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

  static getBlogName(blogId: number) {
    return Axios.get<BlogNameResponseDto>(`${Config.BASE_API_URL}/${BLOG_CONTROLLER_PATH}/getBlogName`, {
      params: {
        blogId,
      },
    });
  }

  static getBlogInfo(blogId: number) {
    return Axios.get<BlogInfoResponseDto>(`${Config.BASE_API_URL}/${BLOG_CONTROLLER_PATH}/getInfo`, {
      params: {
        blogId,
      },
    });
  }

  static getByName(blogName: string) {
    return Axios.get<BlogListItemResponseDto>(`${Config.BASE_API_URL}/${BLOG_CONTROLLER_PATH}/byName`, {
      params: {
        blogName,
      },
    });
  }

  static createNew(blog: CreateBlogRequestDto) {
    return Axios.post<CreateBlogResponseDto>(`${Config.BASE_API_URL}/${BLOG_CONTROLLER_PATH}/create`, blog);
  }

  static update(blog: CreateBlogRequestDto) {
    return Axios.put<CreateBlogResponseDto>(`${Config.BASE_API_URL}/${BLOG_CONTROLLER_PATH}/update`, blog);
  }

  static getAvailabilityToEditBlog(blogId: number) {
    return Axios.get<boolean>(`${Config.BASE_API_URL}/${BLOG_CONTROLLER_PATH}/isAvailable`, {
      params: {
        blogId,
      },
    });
  }

  static getAuthors(blogId: number) {
    return Axios.get<UserSimpleDto[]>(`${Config.BASE_API_URL}/${BLOG_CONTROLLER_PATH}/authors`, {
      params: {
        blogId,
      },
    });
  }

  static kickAuthor(blogId: number, authorId: number) {
    return Axios.put<boolean>(`${Config.BASE_API_URL}/${BLOG_CONTROLLER_PATH}/kickAuthor`, null, {
      params: {
        blogId,
        authorId,
      },
    });
  }
}
