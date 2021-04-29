import React from 'react';

export const CustomersConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/customers',
      exact: true,
      component: React.lazy(() => import('./customers/Customers')),
    },
    {
      path: '/customers/:id',
      component: React.lazy(() => import('./customer/Customer')),
    },
    {
      path: '/customers/new',
      exact: true,
      component: React.lazy(() => import('./new-customer/CreateCustomer')),
    },
  ],
};
