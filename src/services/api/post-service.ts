import Axios from 'axios';
import Config from '@/config';

const POST_CONTROLLER_PATH = 'posts';

export default class PostService {
  static getForBlog(blogId: number) {
    return Axios.get(`${Config.BASE_API_URL}/${POST_CONTROLLER_PATH}/getAllForBlog`, {
      params: {
        blogId,
      },
    });
  }
}
