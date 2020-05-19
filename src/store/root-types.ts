export interface RootState {
  currentBlogId?: number,
  currentBlogName: string,
  isLeftNavbarOpen: boolean | null,
}

export const Modules = {
  blogs: 'blogs',
  posts: 'posts',
  auth: 'auth',
};

export const RootTypes = {
  getters: {},
  mutations: {
    SET_CURRENT_BLOG_ID: 'SET_CURRENT_BLOG_ID',
    SET_CURRENT_BLOG_NAME: 'SET_CURRENT_BLOG_NAME',
    SET_LEFT_NAVIGATION_OPEN_STATE: 'SET_LEFT_NAVIGATION_OPEN_STATE',
  },
  actions: {},
};
