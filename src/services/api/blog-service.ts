import Axios from 'axios';
import Config from '@/config';

const BLOG_CONTROLLER_PATH = 'blogs';

export default class BlogService {
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
}
