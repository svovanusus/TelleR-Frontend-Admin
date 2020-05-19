import { Module } from 'vuex';
import { RootState } from '@/store/root-types';

import PostService from '@/services/api/post-service';
import CreatePostRequestDto from '@/entities/dto/request/create-post-request-dto';

export interface PostListItem {
  pid: number,
  title: string,
  author: string,
  comments: number,
  publishDate: Date,
}

export interface State {
  postList: PostListItem[];
}

export const Types = {
  getters: {},
  mutations: {
    SET_POST_LIST: 'SET_POST_LIST',
    PUSH_NEW_POST: 'PUSH_NEW_POST',
  },
  actions: {
    ADD_POST: 'ADD_POST',
    GET_POSTS: 'GET_POSTS',
  },
};

const module: Module<State, RootState> = {
  namespaced: true,
  state: {
    postList: [],
  },
  getters: {},
  mutations: {
    [Types.mutations.SET_POST_LIST]: (state, postList: PostListItem[]) => {
      state.postList = postList;
    },
    [Types.mutations.PUSH_NEW_POST]: (state, postListItem: PostListItem) => {
      state.postList.push(postListItem);
    },
  },
  actions: {
    [Types.actions.ADD_POST]: async (context, newPost: CreatePostRequestDto) => {
      const response = await PostService.createNew(newPost);
      if (response) {
        const newPostItem: PostListItem = {
          pid: response.data.id,
          author: response.data.author.fullName,
          title: response.data.title,
          publishDate: new Date(response.data.createDate),
          comments: 0,
        };
        context.commit(Types.mutations.PUSH_NEW_POST, newPostItem);
      }
    },
    [Types.actions.GET_POSTS]: async (context, blogId) => {
      const response = await PostService.getForBlog(blogId);
      if (response) {
        context.commit(
          Types.mutations.SET_POST_LIST,
          Array.from(response.data, item => (<PostListItem>{
            pid: item.id,
            title: item.title,
            publishDate: new Date(item.createDate),
            author: item.author.fullName,
            comments: 0,
          })),
        );
      }
    },
  },
};

export default module;
