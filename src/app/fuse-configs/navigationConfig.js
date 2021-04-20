// import { authRoles } from '../../app/auth';

const navigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'example-component',
        title: 'Example',
        type: 'item',
        icon: 'whatshot',
        url: '/example',
      },
      {
        id: 'dashboard-component',
        title: 'Dashboard',
        type: 'item',
        icon: 'dashboard',
        url: '/dashboard',
      },
      {
        id: 'customers-component',
        title: 'Customers',
        type: 'item',
        icon: 'person',
        url: '/customers',
      },
      {
        id: 'inventory-component',
        title: 'Inventory',
        type: 'item',
        icon: 'store',
        url: '/inventory',
      },
      {
        id: 'deceased-component',
        title: 'Deceased',
        type: 'item',
        icon: 'timelapse',
        url: '/deceased',
      },
      {
        id: 'profomer-component',
        title: 'Profomer',
        type: 'item',
        icon: 'description',
        url: '/inventory',
      },
      {
        id: 'invoice-component',
        title: 'Invoice',
        type: 'item',
        icon: 'receipt',
        url: '/inventory',
      },
      {
        id: 'receipts-component',
        title: 'Receipts',
        type: 'item',
        icon: 'receipt',
        url: '/inventory',
      },
      {
        id: 'reports-component',
        title: 'Reports',
        type: 'item',
        icon: 'assessment',
        url: '/inventory',
      },
    ],
  },
];

export default navigationConfig;
