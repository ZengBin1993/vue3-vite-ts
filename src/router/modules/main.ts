import { RouteRecordRaw } from 'vue-router';

export const main: Array<RouteRecordRaw> = [
  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('@/views/welcome.vue'),
    meta: {
      title: '',
      icon: 'home-o',
      active: 'https://image.fulllinkai.com/202406/07/22611b3b9ef8e8ba6e3d3f6f4a92df65.png',
      inactive: 'https://image.fulllinkai.com/202406/07/a9b2708c5e01c1473fc42aaf2f2cc1bb.png',
    },
  },
  // {
  //   path: '/user',
  //   name: 'user',
  //   component: () => import('@/views/tabBar/user.vue'),
  //   meta: {
  //     title: '我的',
  //     icon: 'cart-o',
  //     active: 'https://image.fulllinkai.com/202406/12/1a0d9053c7a3124f5e1feca9d8ff8f77.png',
  //     inactive: 'https://image.fulllinkai.com/202406/12/1ad2a21afa02dbfa65893693edaa4dae.png',
  //   },
  // },
];
