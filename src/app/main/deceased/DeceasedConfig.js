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
      exact: true,
      component: React.lazy(() => import('./DeceasedApp')),
    },
    {
      path: '/deceased/:id/relatives',
      exact: true,
      component: React.lazy(() => import('./relatives/Relatives')),
    },
    {
      path: '/deceased/:id/relatives/:relativeId',
      component: React.lazy(() => import('./relative/Relative')),
    },
  ],
};
