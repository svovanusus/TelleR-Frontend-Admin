import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store, { RootState } from '@/store';

Vue.use(VueRouter);

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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const storeRootState: RootState = store.state;
  if (to.name !== 'auth' && !storeRootState.isAuthorized) next({ name: 'auth' });
  else next();
});

export default router;
