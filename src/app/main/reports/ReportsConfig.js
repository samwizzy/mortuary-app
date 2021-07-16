import React from 'react';

export const ReportsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/reports',
      exact: true,
      component: React.lazy(() => import('./reports/ReportsApp')),
    },
    {
      path: '/reports/admissions',
      exact: true,
      component: React.lazy(() => import('./admissions/ReportsApp')),
    },
    {
      path: '/reports/admissions/:id',
      component: React.lazy(() => import('./admissions/ReportsApp')),
    },
    {
      path: '/reports/releases',
      exact: true,
      component: React.lazy(() => import('./releases/ReportsApp')),
    },
    {
      path: '/reports/releases/:id',
      component: React.lazy(() => import('./releases/ReportsApp')),
    },
  ],
};
