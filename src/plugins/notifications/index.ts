import { PluginObject } from 'vue';
import Component from './Component.vue';

import './theme.scss';

export interface NotifyApi {
  success: (msg: string) => void,
  warning: (msg: string) => void,
  error: (msg: string) => void,
  info: (msg: string) => void,
}

const Plugin = Object.assign<typeof Component, PluginObject<undefined>>(Component, {
  install: (Vue) => {
    Vue.prototype.$notify = <NotifyApi>{
      success: (message: string) => new (Vue.extend(Component))({
        el: document.createElement('div'),
        propsData: { message, type: 'success' },
      }),
      warning: (message: string) => new (Vue.extend(Component))({
        el: document.createElement('div'),
        propsData: { message, type: 'warning' },
      }),
      error: (message: string) => new (Vue.extend(Component))({
        el: document.createElement('div'),
        propsData: { message, type: 'error' },
      }),
      info: (message: string) => new (Vue.extend(Component))({
        el: document.createElement('div'),
        propsData: { message, type: 'info' },
      }),
    };
  },
});

export default Plugin;

declare module 'vue/types/vue' {
  interface Vue {
    $notify: NotifyApi,
  }
}
