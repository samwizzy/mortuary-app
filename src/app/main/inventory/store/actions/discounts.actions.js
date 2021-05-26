import axios from 'axios';
import { showMessage } from '../../../../../app/store/actions/fuse';
import * as Actions from './';
import history from "../../../../../@history"

export const CREATE_DISCOUNT = '[INVENTORY APP] CREATE DISCOUNT';
export const UPDATE_DISCOUNT = '[INVENTORY APP] UPDATE DISCOUNT';
export const DELETE_DISCOUNT = '[INVENTORY APP] DELETE DISCOUNT';
export const GET_DISCOUNTS = '[INVENTORY APP] GET DISCOUNTS';
export const GET_DISCOUNT_BY_ID = '[INVENTORY APP] GET DISCOUNT BY ID';

export const OPEN_DISCOUNT_DIALOG = '[INVENTORY APP] OPEN_DISCOUNT_DIALOG';
export const CLOSE_DISCOUNT_DIALOG = '[INVENTORY APP] CLOSE_DISCOUNT_DIALOG';

export function createDiscount(data) {
  const request = axios.post('/api/v1/discounts', data);
  console.log(request, 'creating discount request');

  return (dispatch) => {
    request.then((response) => {
      if (response.status === 200) {
        dispatch(showMessage({ message: 'Discount created successfully' }));

        Promise.all([
          dispatch({
            type: CREATE_DISCOUNT,
            payload: response.data,
          }),
        ]).then(() => {
          dispatch(Actions.getDiscounts());
          history.push("/inventory/discounts");
        });
      } else {
        dispatch(showMessage({ message: 'Discount creation failed' }));
      }
    });
  };
}

export function getDiscounts() {
  const request = axios.get('/api/v1/discounts');

  return (dispatch) =>
    request.then((response) => {
      console.log(response, "response")
      dispatch({
        type: GET_DISCOUNTS,
        payload: response.data.data,
      })
    });
}

export function getDiscountById(id) {
  const request = axios.get('/api/v1/discounts/' + id);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_DISCOUNT_BY_ID,
        payload: response.data.data,
      })
    );
}

export function updateDiscount(data) {
  const request = axios.put('/api/v1/discounts/' + data.id, data);

  return (dispatch) => {
    request.then((response) => {
      if (response.status === 200) {
        dispatch(showMessage({ message: 'Discount updated successfully' }));

        Promise.all([
          dispatch({
            type: UPDATE_DISCOUNT,
            payload: response.data,
          }),
        ]).then(() => {
          dispatch(Actions.getDiscounts());
          history.push("/inventory/discounts");
        });
      } else {
        dispatch(showMessage({ message: 'Discount update failed' }));
      }
    });
  };
}

export function deleteDiscount(id) {
  const request = axios.delete('/api/v1/discounts/' + id);

  console.log(request, "request for discount delete")

  return (dispatch) => {
    request.then((response) => {
      if (response.status === 200) {
        dispatch(showMessage({ message: 'Discount deleted successfully' }));

        Promise.all([
          dispatch({
            type: DELETE_DISCOUNT,
            payload: response.data,
          }),
        ]).then(() => {
          dispatch(Actions.getDiscounts());
          history.push("/inventory/discounts");
        });
      } else {
        dispatch(showMessage({ message: 'Discount delete failed' }));
      }
    });
  };
}

export function openDiscountDialog(payload) {
  return {
    type: OPEN_DISCOUNT_DIALOG,
    payload
  }
}

export function closeDiscountDialog() {
  return {
    type: CLOSE_DISCOUNT_DIALOG,
  }
}