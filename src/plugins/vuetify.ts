import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#ff5722',
        secondary: '#607d8b',
        accent: '#e91e63',
        error: '#f44336',
        warning: '#ff9800',
        info: '#03a9f4',
        success: '#4caf50',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
});
