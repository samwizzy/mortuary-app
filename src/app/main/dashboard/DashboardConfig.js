import React from 'react';
// import Example from './Example';

export const DashboardConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/dashboard',
      component: React.lazy(() => import('./Dashboard')),
    },
  ],
};
