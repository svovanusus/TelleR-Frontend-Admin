import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '@/store';
import { Modules as StoreModules, RootTypes } from '@/store/root-types';
import { State as AuthStoreState, Types as AuthStoreTypes } from '@/store/modules/auth';
import { Types as UserStoreTypes } from '@/store/modules/user';

Vue.use(VueRouter);

store.dispatch(`${StoreModules.auth}/${AuthStoreTypes.actions.LOAD_STATE}`);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/Index.vue'),
  },
  {
    path: '/login',
    name: 'auth',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/Signup.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: '/blogs/create',
    name: 'blogs-create',
    component: () => import('@/views/blog/Edit.vue'),
  },
  {
    path: '/:bid/info',
    name: 'blog-info',
    component: () => import('@/views/blog/Edit.vue'),
    props: true,
  },
  {
    path: '/:bid/authors',
    name: 'authors',
    component: () => import('@/views/blog/Authors.vue'),
    props: true,
  },
  {
    path: '/:bid/posts',
    name: 'posts',
    component: () => import('@/views/blog/Posts.vue'),
    props: true,
  },
  {
    path: '/:bid/post/:pid',
    name: 'post-editor',
    component: () => import('@/views/blog/PostEditor.vue'),
    props: true,
  },
  {
    path: '/errors/403',
    name: 'error-403',
    component: () => import('@/views/403.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

let loadingTimer: number | null = null;

router.beforeEach(async (to, from, next) => {
  if (loadingTimer) clearTimeout(loadingTimer);
  loadingTimer = setTimeout(() => {
    store.commit(RootTypes.mutations.SET_PAGE_LOADING, true);
    loadingTimer = null;
  }, 500);

  if (to.path === '/logout') {
    await store.dispatch(`${StoreModules.auth}/${AuthStoreTypes.actions.LOGOUT}`);
    next({ name: 'auth' });
    return;
  }

  const authState: AuthStoreState = (<any>store).state[StoreModules.auth];
  if (authState.isAuthorized) {
    await store.dispatch(`${StoreModules.user}/${UserStoreTypes.actions.GET_USER_INFO}`);
  } else {
    store.commit(`${StoreModules.user}/${UserStoreTypes.mutations.CLEAR_USER_INFO}`);
  }

  if (to.name !== 'auth' && to.name !== 'signup' && !authState.isAuthorized) next({ name: 'auth' });
  else if ((to.name === 'auth' || to.name === 'signup') && authState.isAuthorized) next({ name: 'index' });

  if (Object.keys(to.params).indexOf('bid') > -1) {
    await store.dispatch(RootTypes.actions.GET_CURRENT_BLOG_NAME, Number(to.params.bid));
    await store.dispatch(RootTypes.actions.GET_AVAILABILITY_TO_EDIT_BLOG, Number(to.params.bid));
  } else {
    store.commit(RootTypes.mutations.SET_CURRENT_BLOG_ID, 0);
    store.commit(RootTypes.mutations.SET_CURRENT_BLOG_NAME, '');
  }

  next();
});

router.afterEach((to, from) => {
  if (loadingTimer) {
    clearTimeout(loadingTimer);
    loadingTimer = null;
  }
  store.commit(RootTypes.mutations.SET_PAGE_LOADING, false);
});

export default router;
