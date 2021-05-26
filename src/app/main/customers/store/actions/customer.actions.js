import axios from 'axios';
import { showMessage } from '../../../../../app/store/actions/fuse';
import * as Actions from './';

export const CREATE_CUSTOMER = '[CUSTOMER APP] CREATE CUSTOMER';
export const UPDATE_CUSTOMER = '[CUSTOMER APP] UPDATE CUSTOMER';
export const GET_CUSTOMERS = '[CUSTOMER APP] GET CUSTOMERS';
export const GET_CUSTOMER_BY_ID = '[CUSTOMER APP] GET CUSTOMER BY ID';

export function createCustomer(data) {
  const request = axios.post('/api/v1/customers', data);
  console.log(request, 'creating customer request');

  return (dispatch) => {
    request.then((response) => {
      if (response.status === 200) {
        dispatch(showMessage({ message: 'Customer created successfully' }));

        Promise.all([
          dispatch({
            type: CREATE_CUSTOMER,
            payload: response.data,
          }),
        ]).then(() => dispatch(Actions.getCustomers()));
      } else {
        dispatch(showMessage({ message: 'Customer creation failed' }));
      }
    });
  };
}

export function getCustomers() {
  const request = axios.get('/api/v1/customers');

  return (dispatch) =>
    request.then((response) => {
      console.log(response, "response")
      dispatch({
        type: GET_CUSTOMERS,
        payload: response.data.data,
      })
    });
}

export function getCustomerById(id) {
  const request = axios.get('/api/v1/customers/' + id);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_CUSTOMER_BY_ID,
        payload: response.data.data,
      })
    );
}

export function updateCustomer(data) {
  const request = axios.put('/api/v1/customers', data);

  return (dispatch) => {
    request.then((response) => {
      if (response.status === 200) {
        dispatch(showMessage({ message: 'Customer updated successfully' }));

        Promise.all([
          dispatch({
            type: UPDATE_CUSTOMER,
            payload: response.data,
          }),
        ]).then(() => dispatch(Actions.getCustomers()));
      } else {
        dispatch(showMessage({ message: 'Customer update failed' }));
      }
    });
  };
}