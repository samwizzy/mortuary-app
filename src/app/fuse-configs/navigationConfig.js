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
            id: 'inventory-services',
            title: 'Products & Services',
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
        title: 'Invoices',
        type: 'item',
        icon: 'receipt',
        url: '/invoices',
      },
      {
        id: 'proforma-component',
        title: 'Proforma Invoices',
        type: 'item',
        icon: 'receipt',
        url: '/proforma',
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
