import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export interface RootState {
  isAuthorized: boolean,
  isLeftNavbarOpen: boolean | null,
}

export const Modules = {};

export default new Vuex.Store<RootState>({
  state: {
    isAuthorized: false,
    isLeftNavbarOpen: null,
  },
  mutations: {},
  actions: {},
  modules: {},
});
