import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { createRouterGuards } from './routerGuards';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'welcome',
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('@/views/welcome.vue'),
        meta: {
          title: '',
        },
      },
    ],
  },
];

const router = createRouter({
  // process.env.BASE_URL
  history: createWebHashHistory(''),
  routes,
});

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}
export default router;
