import * as Actions from '../actions';

const initialState = {
  loading: false,
  searchText: "",
  customers: {
    count: 0,
    customers: [],
    totalPages: 0,
    currentPage: 0
  },
  customer: null,
  message: null,
};

const customerReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_CUSTOMERS: {
      return {
        ...state,
        customers: action.payload,
      };
    }
    case Actions.CREATE_RETURNING_CUSTOMER: {
      return {
        ...state,
        message: action.payload,
      };
    }
    case Actions.GET_CUSTOMER_BY_ID: {
      return {
        ...state,
        loading: false,
        customer: action.payload,
      };
    }
    case Actions.CREATE_CUSTOMER: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.UPDATE_CUSTOMER: {
      return {
        ...state,
        loading: false,
        message: action.payload,
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

export default customerReducer;
