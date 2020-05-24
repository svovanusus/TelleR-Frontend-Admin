export interface RootState {
  currentBlogAvailableToEdit: boolean,
  currentBlogId?: number,
  currentBlogName: string,
  isLeftNavbarOpen: boolean | null,
  isLoading: boolean,
}

export const Modules = {
  blogs: 'blogs',
  posts: 'posts',
  auth: 'auth',
  user: 'user',
  authorInvites: 'authorInvites',
};

export const RootTypes = {
  getters: {},
  mutations: {
    SET_CURRENT_BLOG_ID: 'SET_CURRENT_BLOG_ID',
    SET_CURRENT_BLOG_NAME: 'SET_CURRENT_BLOG_NAME',
    SET_LEFT_NAVIGATION_OPEN_STATE: 'SET_LEFT_NAVIGATION_OPEN_STATE',
    SET_PAGE_LOADING: 'SET_PAGE_LOADING',
    SET_AVAILABILITY_TO_EDIT_BLOG: 'SET_AVAILABILITY_TO_EDIT_BLOG',
  },
  actions: {
    GET_CURRENT_BLOG_NAME: 'GET_CURRENT_BLOG_NAME',
    GET_AVAILABILITY_TO_EDIT_BLOG: 'GET_AVAILABILITY_TO_EDIT_BLOG',
  },
};
