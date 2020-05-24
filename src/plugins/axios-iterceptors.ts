import { PluginObject } from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';

import store from '@/store';
import { Modules as StoreModules, RootTypes } from '@/store/root-types';
import { State as AuthStoreState, Types as AuthStoreTypes } from '@/store/modules/auth';

import { NotifyApi } from './notifications';

interface AxiosInterceptorsOptopns {
  notify: NotifyApi,
  router: VueRouter,
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
        if (options) options.notify.error('Server is unavailable right now. Please try latter.');
        return null;
      }

      switch (err.response.status) {
        case 400:
          if (options) options.notify.error('Bad request.');
          break;
        case 401:
          if (options) {
            options.notify.error('You are not authorized.');
            if (['/login', '/signup'].indexOf(options.router.currentRoute.path) < 0) options.router.replace('/login');
          }
          break;
        case 403:
          if (options) options.router.replace('/errors/403');
          break;
        case 404:
          if (options) options.notify.error('Requested resource is not found.');
          break;
        case 500:
          if (options) options.notify.error('Internal server error.');
          break;
        default:
          break;
      }

      return err.response;
    });
  },
};

export default axiosInterceptors;
