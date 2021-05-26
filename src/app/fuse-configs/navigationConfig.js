// import { authRoles } from '../../app/auth';

const navigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    type: 'group',
    icon: 'apps',
    children: [
      // {
      //   id: 'example-component',
      //   title: 'Example',
      //   type: 'item',
      //   icon: 'whatshot',
      //   url: '/example',
      // },
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
        type: 'collapse',
        icon: 'store',
        children: [
          {
            id: 'inventory-items',
            title: 'Items',
            type: 'item',
            url: '/inventory/items',
          },
          {
            id: 'inventory-services',
            title: 'Services',
            type: 'item',
            url: '/inventory/services',
          },
          {
            id: 'inventory-discounts',
            title: 'Discounts',
            type: 'item',
            url: '/inventory/discounts',
          },
        ],
      },
      {
        id: 'deceased-component',
        title: 'Deceased',
        type: 'item',
        icon: 'timelapse',
        url: '/deceased',
      },
      {
        id: 'invoice-component',
        title: 'Profomer Invoices',
        type: 'item',
        icon: 'receipt',
        url: '/invoices',
      },
      {
        id: 'receipts-component',
        title: 'Receipts',
        type: 'item',
        icon: 'receipt',
        url: '/receipts',
      },
      {
        id: 'reports-component',
        title: 'Reports',
        type: 'item',
        icon: 'assessment',
        url: '/reports',
      },
    ],
  },
];

export default navigationConfig;
