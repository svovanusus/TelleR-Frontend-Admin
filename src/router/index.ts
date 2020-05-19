import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '@/store';
import { Modules as StoreModules, RootTypes } from '@/store/root-types';
import { State as AuthStoreState, Types as AuthStoreTypes } from '@/store/modules/auth';

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
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/UserSettings.vue'),
  },
  {
    path: '/blogs/create',
    name: 'blogs-create',
    component: () => import('@/views/blog/Edit.vue'),
  },
  {
    path: '/:bid/dashboard',
    name: 'dashboard',
    component: () => import('@/views/blog/Dashboard.vue'),
    props: true,
  },
  {
    path: '/:bid/info',
    name: 'blog-info',
    component: () => import('@/views/blog/BlogInfo.vue'),
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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/logout') {
    store.dispatch(`${StoreModules.auth}/${AuthStoreTypes.actions.LOGOUT}`);
    next({ name: 'auth' });
    return;
  }

  const authState: AuthStoreState = (<any>store).state[StoreModules.auth];
  store.commit(RootTypes.mutations.SET_CURRENT_BLOG_ID, Number(to.params.bid));
  store.commit(RootTypes.mutations.SET_CURRENT_BLOG_NAME, to.params.bid ? `Selected(${to.params.bid})` : '');
  if (to.name !== 'auth' && to.name !== 'signup' && !authState.isAuthorized) next({ name: 'auth' });
  else if (to.name === 'auth' && authState.isAuthorized) next({ name: 'index' });
  else next();
});

// eslint-disable-next-line no-underscore-dangle
(<any>window).__VUE_ROUTER = router;

export default router;
