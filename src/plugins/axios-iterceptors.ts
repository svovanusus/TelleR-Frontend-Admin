import { PluginObject } from 'vue';
import Axios from 'axios';

const axiosInterceptors: PluginObject<unknown> = {
  install(Vue) {
    Axios.interceptors.response.use(val => val, (err) => {
      if (!err.response) {
        // console.log('UNKNOWN ERROR!');
        return;
      }

      switch (err.response.status) {
        case 400:
          // console.log('ERROR - 400');
          break;
        case 401:
          // console.log('ERROR - 401');
          break;
        case 403:
          // console.log('ERROR - 403');
          break;
        case 404:
          // console.log('ERROR - 404');
          break;
        case 500:
          // console.log('ERROR - 500');
          break;
        default:
          break;
      }
    });
  },
};

export default axiosInterceptors;
