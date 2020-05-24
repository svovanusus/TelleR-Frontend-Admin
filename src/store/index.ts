import Vue from 'vue';
import Vuex from 'vuex';

import BlogService from '@/services/api/blog-service';

import { Modules, RootState, RootTypes } from './root-types';

// Modules

import BlogsModule from './modules/blogs';
import PostsModule from './modules/posts';
import AuthModule from './modules/auth';
import UserModule from './modules/user';
import AuthorInvitesModule from './modules/author-invites';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    currentBlogAvailableToEdit: false,
    currentBlogId: undefined,
    currentBlogName: '',
    isLeftNavbarOpen: null,
    isLoading: true,
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
    [RootTypes.mutations.SET_PAGE_LOADING]: (state, isLoading: boolean) => {
      state.isLoading = isLoading;
    },
    [RootTypes.mutations.SET_AVAILABILITY_TO_EDIT_BLOG]: (state, isAvailable: boolean) => {
      state.currentBlogAvailableToEdit = isAvailable;
    },
  },
  actions: {
    [RootTypes.actions.GET_CURRENT_BLOG_NAME]: async (context, blogId: number) => {
      context.commit(RootTypes.mutations.SET_CURRENT_BLOG_ID, blogId);
      const response = await BlogService.getBlogName(blogId);
      if (response && response.data) {
        context.commit(RootTypes.mutations.SET_CURRENT_BLOG_NAME, response.data.blogName);
      }
    },
    [RootTypes.actions.GET_AVAILABILITY_TO_EDIT_BLOG]: async (context, blogId: number) => {
      const response = await BlogService.getAvailabilityToEditBlog(blogId);
      if (response && response.data) {
        context.commit(RootTypes.mutations.SET_AVAILABILITY_TO_EDIT_BLOG, response.data);
      } else {
        context.commit(RootTypes.mutations.SET_AVAILABILITY_TO_EDIT_BLOG, false);
      }
    },
  },
  modules: {
    [Modules.blogs]: BlogsModule,
    [Modules.posts]: PostsModule,
    [Modules.auth]: AuthModule,
    [Modules.user]: UserModule,
    [Modules.authorInvites]: AuthorInvitesModule,
  },
});
