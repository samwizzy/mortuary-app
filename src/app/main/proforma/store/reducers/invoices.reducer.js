import * as Actions from '../actions';

const initialState = {
  searchText: '',
  proformaInvoices: {
    totalItems: 0,
    invoices: [],
    totalPages: 0,
    currentPage: 0
  },
  proformaInvoice: null,
  proformainvoiceDialog: {
    props: {
      open: false,
    },
    data: null,
  },
};

const proformaInvoicesReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_PROFORMA_INVOICES: {
      return {
        ...state,
        proformaInvoices: action.payload,
      };
    }
    case Actions.GET_PROFORMA_INVOICE_BY_ID: {
      return {
        ...state,
        proformaInvoice: action.payload,
      };
    }
    case Actions.SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case Actions.OPEN_PROFORMA_INVOICE_DIALOG: {
      return {
        ...state,
        proformainvoiceDialog: {
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_PROFORMA_INVOICE_DIALOG: {
      return {
        ...state,
        proformainvoiceDialog: {
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

export default proformaInvoicesReducer;
