import * as Actions from '../actions';

const initialState = {
  loading: false,
  searchText: "",
  allDeceased: {
    deceased: [],
    count: 0,
    currentPage: 0,
    totalPages: 0,
  },
  deceased: null,
  embalmmentCert: null,
  cremationCert: null,
  message: null,
};

const deceasedReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_ALL_DECEASED: {
      return {
        ...state,
        allDeceased: action.payload,
      };
    }
    case Actions.GET_DECEASED_BY_ID: {
      return {
        ...state,
        loading: false,
        deceased: action.payload,
      };
    }
    case Actions.CREATE_DECEASED: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.UPDATE_DECEASED: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.PRINT_ADMISSION_FORM: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.PRINT_EMBALMMENT_CERTIFICATE: {
      return {
        ...state,
        loading: false,
        embalmmentCert: action.payload,
      };
    }
    case Actions.PRINT_CREMATION_CERTIFICATE: {
      return {
        ...state,
        loading: false,
        cremationCert: action.payload,
      };
    }
    case Actions.SET_SEARCH_TEXT: {
      return {
        ...state,
        loading: false,
        searchText: action.searchText,
      };
    }
    default: {
      return state;
    }
  }
};

export default deceasedReducer;
