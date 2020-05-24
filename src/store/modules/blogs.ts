import { Module } from 'vuex';
import { RootState } from '@/store/root-types';
import BlogService from '@/services/api/blog-service';
import CreateBlogRequestDto from '@/entities/dto/request/create-blog-request-dto';

export interface BlogListItem {
  bid: number,
  title: string,
  authors: number,
  owner: string,
  posts: number,
}

export interface State {
  blogList: BlogListItem[],
}

export const Types = {
  getters: {},
  mutations: {
    SET_BLOG_LIST: 'SET_BLOG_LIST',
    PUSH_NEW_BLOG: 'PUSH_NEW_BLOG',
  },
  actions: {
    ADD_BLOG: 'ADD_BLOG',
    GET_BLOGS: 'GET_BLOGS',
  },
};

const module: Module<State, RootState> = {
  namespaced: true,
  state: {
    blogList: [],
  },
  getters: {},
  mutations: {
    [Types.mutations.SET_BLOG_LIST]: (state, blogList: BlogListItem[]) => {
      state.blogList = blogList;
    },
    [Types.mutations.PUSH_NEW_BLOG]: (state, newBlog: BlogListItem) => {
      state.blogList.push(newBlog);
    },
  },
  actions: {
    [Types.actions.ADD_BLOG]: async (context, model: {
      blog: CreateBlogRequestDto,
      onSuccess: (msg: string) => void,
      onError: (msg: string) => void,
    }) => {
      const response = await BlogService.createNew(model.blog);
      if (response) {
        if (response.data.isError) {
          if (typeof model.onError !== 'undefined') model.onError(response.data.messages.join('<br>'));
        } else if (typeof model.onSuccess !== 'undefined') model.onSuccess('New blog successfully created.');
      }
    },
    [Types.actions.GET_BLOGS]: async (context) => {
      const response = await BlogService.getAll();
      if (response) {
        context.commit(
          Types.mutations.SET_BLOG_LIST,
          Array.from(response.data, item => (<BlogListItem>{
            bid: item.id,
            authors: 1,
            owner: item.author.fullName,
            posts: item.postsCount,
            title: item.title,
          })),
        );
      }
    },
  },
};

export default module;
