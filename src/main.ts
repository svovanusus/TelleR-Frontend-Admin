import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import AxiosInterceptors from './plugins/axios-iterceptors';
import vuetify from './plugins/vuetify';
import notify from './plugins/notifications';

import './assets/scss/main.scss';

Vue.use(notify);
Vue.use(AxiosInterceptors, { notify: Vue.prototype.$notify });

Vue.config.productionTip = false;

// eslint-disable-next-line no-underscore-dangle
(<any>window).___VUE = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
