import * as Actions from '../actions';

const initialState = {
  loading: false,
  searchText: "",
  reports: {
    totalItems: 0,
    receipts: [],
    totalPages: 0,
    currentPage: 0
  },
  admissions: {
    totalItems: 0,
    receipts: [],
    totalPages: 0,
    currentPage: 0
  },
  releases: {
    totalItems: 0,
    receipts: [],
    totalPages: 0,
    currentPage: 0
  },
  report: null,
  message: null,
};

const reportsReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_RECEIPTS: {
      return {
        ...state,
        reports: action.payload,
      };
    }
    case Actions.GET_RECEIPT_BY_ID: {
      return {
        ...state,
        report: action.payload,
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
