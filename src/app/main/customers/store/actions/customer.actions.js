import axios from 'axios';
import { showMessage } from '../../../../../app/store/actions/fuse';
import * as Actions from './';
import history from '../../../../../@history';

export const CREATE_CUSTOMER = '[CUSTOMER APP] CREATE CUSTOMER';
export const CREATE_CUSTOMER_ERROR = '[CUSTOMER APP] CREATE CUSTOMER ERROR';
export const CREATE_CUSTOMER_PROGRESS =
  '[CUSTOMER APP] CREATE CUSTOMER PROGRESS';

export const CREATE_RETURNING_CUSTOMER =
  '[CUSTOMER APP] CREATE RETURNING CUSTOMER';

export const UPDATE_CUSTOMER = '[CUSTOMER APP] UPDATE CUSTOMER';
export const UPDATE_CUSTOMER_ERROR = '[CUSTOMER APP] UPDATE CUSTOMER ERROR';

export const GET_CUSTOMERS = '[CUSTOMER APP] GET CUSTOMERS';
export const GET_CUSTOMER_BY_ID = '[CUSTOMER APP] GET CUSTOMER BY ID';

export const SET_SEARCH_TEXT = '[CUSTOMER APP] SET SEARCH TEXT';

export const OPEN_EDIT_CUSTOMER_DIALOG =
  '[CUSTOMER APP] OPEN EDIT CUSTOMER DIALOG';
export const CLOSE_EDIT_CUSTOMER_DIALOG =
  '[CUSTOMER APP] CLOSE EDIT CUSTOMER DIALOG';

export function createCustomer(data) {
  console.log(data, 'data create customer');
  const request = axios.post('/api/v1/customers', data);

  return async (dispatch) => {
    dispatch({ type: CREATE_CUSTOMER_PROGRESS });

    await request
      .then((response) => {
        dispatch(showMessage({ message: 'Customer created successfully' }));

        Promise.all([
          dispatch({
            type: CREATE_CUSTOMER,
            payload: response.data,
          }),
        ]).then(() => {
          dispatch(Actions.getCustomers());
          history.push('/customers');
        });
      })
      .catch((err) => {
        console.dir(err?.response?.data, 'err');
        if (err?.response && err.response?.data) {
          dispatch(showMessage({ message: err?.response?.data?.message }));
        }
        dispatch({ type: CREATE_CUSTOMER_ERROR, payload: err?.response });
      });
  };
}

export function createReturningCustomer(data, id) {
  const request = axios.post(
    `/api/v1/customers/customer_id/${id}/request_service`,
    data
  );

  return (dispatch) => {
    dispatch({ type: CREATE_CUSTOMER_PROGRESS });

    request
      .then((response) => {
        dispatch(showMessage({ message: 'Services requested successfully' }));

        Promise.all([
          dispatch({
            type: CREATE_RETURNING_CUSTOMER,
            payload: response.data,
          }),
        ]).then(() => {
          dispatch(Actions.getCustomers());
          history.push('/customers');
        });
      })
      .catch((err) => {
        dispatch(showMessage({ message: 'Services request failed' }));
        dispatch({ type: CREATE_CUSTOMER_ERROR, payload: err?.response });
      });
  };
}

export function getCustomers(page = 0, size = 10) {
  const request = axios.get('/api/v1/customers', { params: { page, size } });

  return (dispatch) =>
    request.then((response) => {
      console.log(response, 'response');
      dispatch({
        type: GET_CUSTOMERS,
        payload: response.data.data,
      });
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

export function updateCustomer(customer_id, data) {
  const request = axios.put(`/api/v1/customers/${customer_id}`, data);

  return (dispatch) => {
    dispatch({ type: CREATE_CUSTOMER_PROGRESS });

    request
      .then((response) => {
        dispatch(showMessage({ message: 'Customer updated successfully' }));

        Promise.all([
          dispatch({
            type: UPDATE_CUSTOMER,
            payload: response.data,
          }),
        ]).then(() => {
          history.push(`/customers/${customer_id}`);
          dispatch(Actions.closeEditCustomerDialog());
          window.location.reload();
        });
      })
      .catch((err) => {
        dispatch({ type: UPDATE_CUSTOMER_ERROR, payload: err?.response });
      });
  };
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value,
  };
}

export function openEditCustomerDialog(payload) {
  return {
    type: OPEN_EDIT_CUSTOMER_DIALOG,
    payload,
  };
}

export function closeEditCustomerDialog() {
  return {
    type: CLOSE_EDIT_CUSTOMER_DIALOG,
  };
}
