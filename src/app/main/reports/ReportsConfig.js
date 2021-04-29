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
      component: React.lazy(() => import('./ReportsApp')),
    },
    {
      path: '/reports/:id',
      component: React.lazy(() => import('./ReportsApp')),
    },
  ],
};
