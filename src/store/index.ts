import Vue from 'vue';
import Vuex from 'vuex';

import { Modules, RootState, RootTypes } from './root-types';

// Modules

import BlogsModule from './modules/blogs';
import PostsModule from './modules/posts';
import AuthModule from './modules/auth';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    currentBlogId: undefined,
    currentBlogName: '',
    isLeftNavbarOpen: null,
  },
  mutations: {
    [RootTypes.mutations.SET_CURRENT_BLOG_ID]: (state, blogId: number) => {
      state.currentBlogId = blogId;
    },
    [RootTypes.mutations.SET_CURRENT_BLOG_NAME]: (state, blogName: string) => {
      state.currentBlogName = blogName;
    },
    [RootTypes.mutations.SET_LEFT_NAVIGATION_OPEN_STATE]: (state, isLeftNavbarOpen: boolean) => {
      state.isLeftNavbarOpen = isLeftNavbarOpen;
    },
  },
  actions: {},
  modules: {
    [Modules.blogs]: BlogsModule,
    [Modules.posts]: PostsModule,
    [Modules.auth]: AuthModule,
  },
});
