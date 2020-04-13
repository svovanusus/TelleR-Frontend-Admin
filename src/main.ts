import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import AxiosInterceptors from './plugins/axios-iterceptors';
import vuetify from './plugins/vuetify';

import './assets/scss/main.scss';

Vue.use(AxiosInterceptors);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
