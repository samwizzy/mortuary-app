import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse';
import { ExampleConfig } from 'app/main/example/ExampleConfig';
import { DashboardConfig } from 'app/main/dashboard/DashboardConfig';
import { CustomersConfig } from 'app/main/customers/CustomersConfig';
import { RelativesConfig } from 'app/main/relatives/RelativesConfig';
import { DeceasedConfig } from 'app/main/deceased/DeceasedConfig';
import { InventoryConfig } from 'app/main/inventory/InventoryConfig';
import { InvoiceConfig } from 'app/main/invoice/InvoiceConfig';
import { ReceiptConfig } from 'app/main/receipt/ReceiptConfig';
import { ReportsConfig } from 'app/main/reports/ReportsConfig';
import { AuthConfig } from 'app/main/auth/AuthConfig';

const routeConfigs = [
  ExampleConfig,
  AuthConfig,
  DashboardConfig,
  CustomersConfig,
  RelativesConfig,
  InventoryConfig,
  InvoiceConfig,
  ReceiptConfig,
  ReportsConfig,
  DeceasedConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    component: () => <Redirect to='/dashboard' />,
  },
];

export default routes;
