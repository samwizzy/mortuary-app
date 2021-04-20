import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse';
import { ExampleConfig } from 'app/main/example/ExampleConfig';
import { DashboardConfig } from 'app/main/dashboard/DashboardConfig';
import { CustomersConfig } from 'app/main/customers/CustomersConfig';
import { AuthConfig } from 'app/main/auth/AuthConfig';

const routeConfigs = [
  ExampleConfig,
  AuthConfig,
  DashboardConfig,
  CustomersConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    component: () => <Redirect to='/example' />,
  },
];

export default routes;
