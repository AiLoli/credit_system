import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const page: AppRouteModule = {
  path: '/account',
  name: 'Account',
  component: LAYOUT,
  redirect: '/account/setting',
  meta: {
    hideMenu: true,
    title: t('routes.demo.page.page'),
  },
  children: [
    {
      path: 'setting',
      name: 'AccountSetting',
      meta: {
        hideTab: true,
        title: t('routes.demo.page.accountSetting'),
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/account/setting/index.vue'),
    },
  ],
};

export default page;
