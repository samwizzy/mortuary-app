import React from 'react';

export const DeceasedConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/deceased',
      exact: true,
      component: React.lazy(() => import('./DeceasedApp')),
    },
    {
      path: '/deceased/:id',
      component: React.lazy(() => import('./DeceasedApp')),
    },
  ],
};
