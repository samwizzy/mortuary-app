import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
  entities: null,
  searchText: '',
  selectedInvoiceIds: [],
  routeParams: {},
  paymentAdvice: null,
  invoiceDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  recordPaymentDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

const invoicesReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_INVOICES: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id'),
        routeParams: action.routeParams,
      };
    }
    case Actions.GET_PAYMENT_ADVICE: {
      return {
        ...state,
        paymentAdvice: action.payload,
        routeParams: action.routeParams,
      };
    }
    case Actions.SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case Actions.SELECT_ALL_INVOICES: {
      const arr = Object.keys(state.entities).map((k) => state.entities[k]);

      const selectedInvoiceIds = arr.map((invoice) => invoice.id);

      return {
        ...state,
        selectedInvoiceIds: selectedInvoiceIds,
      };
    }
    case Actions.DESELECT_ALL_INVOICES: {
      return {
        ...state,
        selectedInvoiceIds: [],
      };
    }
    case Actions.OPEN_NEW_INVOICE_DIALOG: {
      return {
        ...state,
        invoiceDialog: {
          type: 'new',
          props: {
            open: true,
          },
          data: null,
        },
      };
    }
    case Actions.CLOSE_NEW_INVOICE_DIALOG: {
      return {
        ...state,
        invoiceDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case Actions.OPEN_EDIT_INVOICE_DIALOG: {
      return {
        ...state,
        invoiceDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case Actions.CLOSE_EDIT_INVOICE_DIALOG: {
      return {
        ...state,
        invoiceDialog: {
          type: 'edit',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case Actions.OPEN_NEW_RECORD_PAYMENT_DIALOG: {
      return {
        ...state,
        recordPaymentDialog: {
          type: 'new',
          props: {
            open: true,
          },
          data: null,
        },
      };
    }
    case Actions.CLOSE_NEW_RECORD_PAYMENT_DIALOG: {
      return {
        ...state,
        recordPaymentDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default invoicesReducer;
