import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const redit: AppRouteModule = {
  path: '/credit',
  name: 'Credit',
  component: LAYOUT,
  redirect: '/credit/contract',
  meta: {
    orderNo: 3,
    icon: 'ion:card-outline',
    title: t('routes.demo.credit.moduleName'),
  },
  children: [
    {
      path: 'contract',
      name: 'CreditContract',
      meta: {
        title: t('routes.demo.credit.contract'),
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/credit/contract/index.vue'),
    },
    {
      path: 'contract_detail/:id',
      name: 'CreditContractDetail',
      meta: {
        hideMenu: true,
        title: t('routes.demo.credit.contractDetail'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/credit/contract',
      },
      component: () => import('/@/views/credit/contract/detail/index.vue'),
    },
    {
      path: 'risk_forecast',
      name: 'CreditRiskForecast',
      meta: {
        title: t('routes.demo.credit.riskForecast'),
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/credit/predict/index.vue'),
    },
    {
      path: 'risk_forecast_detail/:id',
      name: 'CreditRiskForecastDetail',
      meta: {
        hideMenu: true,
        title: t('routes.demo.credit.riskForecastDetail'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/credit/risk_forecast',
      },
      component: () => import('/@/views/credit/predict/risk_forecast.vue'),
    },
    {
      path: 'apply',
      name: 'CreditApply',
      meta: {
        title: t('routes.demo.credit.creditApply'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/credit/apply/index.vue'),
    },
    {
      path: 'approval',
      name: 'CreditApproval',
      meta: {
        title: t('routes.demo.credit.creditApproval'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/credit/approval/index.vue'),
    },
    {
      path: 'apply_detail/:id',
      name: 'CreditApplyDetail',
      meta: {
        hideMenu: true,
        title: t('routes.demo.credit.creditApplyDetail'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/credit/approval',
      },
      component: () => import('/@/views/credit/approval/detail/index.vue'),
    },
  ],
};

export default redit;
