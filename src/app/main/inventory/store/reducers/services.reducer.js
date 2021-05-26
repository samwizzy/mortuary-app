import * as Actions from '../actions';

const initialState = {
  loading: false,
  services: [],
  service: null,
  message: null,
  serviceDialog: {
    open: false,
    type: "edit",
    data: null
  }
};

const servicesReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_SERVICES: {
      return {
        ...state,
        services: action.payload,
      };
    }
    case Actions.GET_SERVICE_BY_ID: {
      return {
        ...state,
        loading: false,
        service: action.payload,
      };
    }
    case Actions.CREATE_SERVICE: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.UPDATE_SERVICE: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.OPEN_SERVICE_DIALOG: {
      return {
        ...state,
        serviceDialog: {
          ...state.serviceDialog,
          open: true,
          data: action.payload
        }
      };
    }
    case Actions.CLOSE_SERVICE_DIALOG: {
      return {
        ...state,
        serviceDialog: {
          ...state.serviceDialog,
          open: false,
          data: null
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default servicesReducer;
