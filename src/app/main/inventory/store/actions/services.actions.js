import axios from 'axios';
import { showMessage } from '../../../../../app/store/actions/fuse';
import * as Actions from './';
import history from "../../../../../@history"

export const CREATE_SERVICE = '[INVENTORY APP] CREATE SERVICE';
export const UPDATE_SERVICE = '[INVENTORY APP] UPDATE SERVICE';
export const DELETE_SERVICE = '[INVENTORY APP] DELETE SERVICE';
export const GET_SERVICES = '[INVENTORY APP] GET SERVICES';
export const GET_SERVICE_BY_ID = '[INVENTORY APP] GET SERVICE BY ID';

export const CREATE_ITEM = '[INVENTORY APP] CREATE ITEM';
export const UPDATE_ITEM = '[INVENTORY APP] UPDATE ITEM';
export const GET_ITEMS = '[INVENTORY APP] GET ITEMS';
export const GET_ITEM_BY_ID = '[INVENTORY APP] GET ITEM BY ID';

export const OPEN_SERVICE_DIALOG = '[INVENTORY APP] OPEN_SERVICE_DIALOG';
export const CLOSE_SERVICE_DIALOG = '[INVENTORY APP] CLOSE_SERVICE_DIALOG';

export function createService(data) {
  const request = axios.post('/api/v1/services', data);

  return (dispatch) => {
    request.then((response) => {
      if (response.status === 200) {
        dispatch(showMessage({ message: 'Service created successfully' }));

        Promise.all([
          dispatch({
            type: CREATE_SERVICE,
            payload: response.data.data,
          }),
        ]).then(() => {
          dispatch(Actions.getServices());
          history.push("/inventory/services")
        });
      } else {
        dispatch(showMessage({ message: 'Service creation failed' }));
      }
    });
  };
}

export function getServices() {
  const request = axios.get('/api/v1/services');

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_SERVICES,
        payload: response.data.data,
      })
    );
}

export function getServiceById(id) {
  const request = axios.get('/api/v1/services/' + id);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_SERVICE_BY_ID,
        payload: response.data,
      })
    );
}

export function updateService(data) {
  const request = axios.put('/api/v1/services/' + data.id, data);

  return (dispatch) => {
    request.then((response) => {
      if (response.status === 200) {
        dispatch(showMessage({ message: 'Service updated successfully' }));

        Promise.all([
          dispatch({
            type: UPDATE_SERVICE,
            payload: response.data,
          }),
        ]).then(() => {
          dispatch(Actions.getServices());
          history.push("/inventory/services")
        });
      } else {
        dispatch(showMessage({ message: 'Service update failed' }));
      }
    });
  };
}

export function deleteService(id) {
  const request = axios.put('/api/v1/services/' + id);

  return (dispatch) => {
    request.then((response) => {
      if (response.status === 200) {
        dispatch(showMessage({ message: 'Service deleted successfully' }));

        Promise.all([
          dispatch({
            type: DELETE_SERVICE,
            payload: response.data,
          }),
        ]).then(() => {
          dispatch(Actions.getServices());
          history.push("/inventory/services")
        });
      } else {
        dispatch(showMessage({ message: 'Service deletion failed' }));
      }
    });
  };
}

export function openServiceDialog(payload) {
  return {
    type: OPEN_SERVICE_DIALOG,
    payload
  }
}

export function closeServiceDialog() {
  return {
    type: CLOSE_SERVICE_DIALOG,
  }
}