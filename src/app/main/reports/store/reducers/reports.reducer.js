import * as Actions from '../actions';

const initialState = {
  loading: false,
  searchText: "",
  admissions: {
    totalItems: 0,
    admissions: [],
    totalPages: 0,
    currentPage: 0
  },
  cremations: {
    totalItems: 0,
    cremations: [],
    totalPages: 0,
    currentPage: 0
  },
  vaults: {
    totalItems: 0,
    cremations: [],
    totalPages: 0,
    currentPage: 0
  },
  vouchers: {
    totalItems: 0,
    voucherList: [],
    totalPages: 0,
    currentPage: 0
  },
  message: null,
};

const reportsReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_ADMISSION_REPORT: {
      return {
        ...state,
        loading: false,
        admissions: action.payload,
      };
    }
    case Actions.GET_CREMATION_REPORT: {
      return {
        ...state,
        loading: false,
        cremations: action.payload,
      };
    }
    case Actions.GET_VAULT_REPORT: {
      return {
        ...state,
        loading: false,
        vaults: action.payload,
      };
    }
    case Actions.GET_VOUCHER_REPORT: {
      return {
        ...state,
        loading: false,
        vouchers: action.payload,
      };
    }
    case Actions.FETCH_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.FETCH_REPORT_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    default: {
      return state;
    }
  }
};

export default reportsReducer;
