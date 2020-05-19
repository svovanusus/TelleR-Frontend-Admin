import { PluginObject } from 'vue';
import Axios from 'axios';

import store from '@/store';
import { Modules as StoreModules, RootTypes } from '@/store/root-types';
import { State as AuthStoreState, Types as AuthStoreTypes } from '@/store/modules/auth';

import { NotifyApi } from './notifications';

interface AxiosInterceptorsOptopns {
  notify: NotifyApi;
}

const axiosInterceptors: PluginObject<AxiosInterceptorsOptopns> = {
  install(Vue, options) {
    Axios.interceptors.request.use((config) => {
      const authState: AuthStoreState = (<any>store).state[StoreModules.auth];
      if (authState.token) config.headers.Authorization = `Bearer ${authState.token}`;
      else delete config.headers.Authorization;
      return config;
    }, err => Promise.reject(err));

    Axios.interceptors.response.use(val => val, (err) => {
      if (!err.response) {
        if (options) options.notify.error('Server is unavailable right now. Please try latter');
        return null;
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

      return err.response;
    });
  },
};

export default axiosInterceptors;
