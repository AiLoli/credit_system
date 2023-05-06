import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const homepage: AppRouteModule = {
  path: '/homepage',
  name: 'Homepage',
  component: LAYOUT,
  redirect: '/homepage/index',
  meta: {
    hideChildrenInMenu: true,
    orderNo: 1,
    icon: 'ion:home-outline',
    title: t('routes.homepage.homepage'),
  },
  children: [
    {
      path: 'index',
      name: 'Workbench',
      component: () => import('/@/views/homepage/workbench/index.vue'),
      meta: {
        title: t('routes.homepage.workbench'),
        hideMenu: true,
        icon: 'ion:grid-outline',
      },
    },
  ],
};

export default homepage;
