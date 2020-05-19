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
    [Types.actions.ADD_BLOG]: async (context, newBlog: CreateBlogRequestDto) => {
      const response = await BlogService.createNew(newBlog);
      if (response) {
        const newBlogListItem: BlogListItem = {
          bid: response.data.id,
          title: response.data.title,
          owner: response.data.author.fullName,
          posts: 0,
          authors: 1,
        };
        context.commit(Types.mutations.PUSH_NEW_BLOG, newBlogListItem);
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
            posts: 0,
            title: item.title,
          })),
        );
      }
    },
  },
};

export default module;
