import axios from 'axios';
import * as Actions from "./"
import { showMessage } from '../../../../../app/store/actions/fuse';
import history from "../../../../../@history"

export const GET_INVOICES = '[INVOICES APP] GET INVOICES';
export const GET_INVOICE_BY_ID = '[INVOICES APP] GET INVOICE BY ID';
export const SET_SEARCH_TEXT = '[INVOICES APP] SET SEARCH TEXT';

export const SELECT_ALL_INVOICES = '[INVOICES APP] SELECT ALL INVOICES';
export const DESELECT_ALL_INVOICES = '[INVOICES APP] DESELECT ALL INVOICES';
export const OPEN_NEW_INVOICE_DIALOG = '[INVOICES APP] OPEN NEW INVOICE DIALOG';
export const CLOSE_NEW_INVOICE_DIALOG = '[INVOICES APP] CLOSE NEW INVOICE DIALOG';
export const OPEN_EDIT_INVOICE_DIALOG = '[INVOICES APP] OPEN EDIT INVOICE DIALOG';
export const CLOSE_EDIT_INVOICE_DIALOG = '[INVOICES APP] CLOSE EDIT INVOICE DIALOG';

export const OPEN_NEW_RECORD_PAYMENT_DIALOG = '[INVOICES APP] OPEN NEW RECORD PAYMENT DIALOG';
export const CLOSE_NEW_RECORD_PAYMENT_DIALOG = '[INVOICES APP] CLOSE NEW RECORD PAYMENT DIALOG';
export const OPEN_EDIT_RECORD_PAYMENT_DIALOG = '[INVOICES APP] OPEN EDIT RECORD PAYMENT DIALOG';
export const CLOSE_EDIT_RECORD_PAYMENT_DIALOG = '[INVOICES APP] CLOSE EDIT RECORD PAYMENT DIALOG';
export const ADD_INVOICE = '[INVOICES APP] ADD INVOICE';
export const UPDATE_INVOICE = '[INVOICES APP] UPDATE INVOICE';
export const REMOVE_INVOICE = '[INVOICES APP] REMOVE INVOICE';
export const REMOVE_INVOICES = '[INVOICES APP] REMOVE INVOICES';
export const GET_PAYMENT_ADVICE = '[INVOICES APP] GET PAYMENT ADVICE';

export function addInvoice(data) {
  const { customer_id: id } = data
  const request = axios.post(`/api/v1/invoices/customer_id/${id}/add_invoice`, data);
  console.log(request, 'creating Invoice request');

  return (dispatch) => {
    request.then((response) => {
      if (response.status === 200) {
        dispatch(showMessage({ message: 'Invoice created successfully' }));

        Promise.all([
          dispatch({
            type: ADD_INVOICE,
            payload: response.data,
          }),
        ]).then(() => {
          dispatch(Actions.getInvoices());
          history.push("/invoices")
        });
      } else {
        dispatch(showMessage({ message: 'Invoice creation failed' }));
      }
    });
  };
}

export function getInvoices(page=0, size=10) {
  const request = axios.get('/api/v1/invoices', { params: { page, size } });

  console.log(request, "get request invoice")

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_INVOICES,
        payload: response.data.data
      })
    );
}

export function getInvoiceById(id) {
  const request = axios.get('/api/v1/invoices/' + id);

  console.log(request, "get request invoice by id")

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_INVOICE_BY_ID,
        payload: response.data.data
      })
    );
}

export function getPaymentAdvice(id) {
  const request = axios.get(`/api/v1/payments/customer_id/${id}/payment_advice`);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_PAYMENT_ADVICE,
        payload: response.data,
      })
    );
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value,
  };
}

export function deSelectAllInvoices() {
  return {
    type: DESELECT_ALL_INVOICES,
  };
}

export function openNewInvoiceDialog() {
  return {
    type: OPEN_NEW_INVOICE_DIALOG,
  };
}

export function closeNewInvoiceDialog() {
  return {
    type: CLOSE_NEW_INVOICE_DIALOG,
  };
}

export function openEditInvoiceDialog(data) {
  return {
    type: OPEN_EDIT_INVOICE_DIALOG,
    data,
  };
}

export function closeEditInvoiceDialog() {
  return {
    type: CLOSE_EDIT_INVOICE_DIALOG,
  };
}

export function openNewRecordPaymentDialog() {
  return {
    type: OPEN_NEW_RECORD_PAYMENT_DIALOG,
  };
}

export function closeNewRecordPaymentDialog() {
  return {
    type: CLOSE_NEW_RECORD_PAYMENT_DIALOG,
  };
}

export function updateInvoice(invoice) {
  return (dispatch, getState) => {
    const { routeParams } = getState().InvoicesApp.invoices;

    const request = axios.post('/api/update-invoice', {
      invoice,
    });

    return request.then((response) =>
      Promise.all([
        dispatch({
          type: UPDATE_INVOICE,
        }),
      ]).then(() => dispatch(getInvoices(routeParams)))
    );
  };
}

export function removeInvoice(invoiceId) {
  return (dispatch, getState) => {
    const { routeParams } = getState().invoicesApp.invoices;

    const request = axios.post('/api/remove-invoice', {
      invoiceId,
    });

    return request.then((response) =>
      Promise.all([
        dispatch({
          type: REMOVE_INVOICE,
        }),
      ]).then(() => dispatch(getInvoices(routeParams)))
    );
  };
}

export function removeInvoices(invoiceIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().invoicesApp.invoices;

    const request = axios.post('/api/remove-invoices', {
      invoiceIds,
    });

    return request.then((response) =>
      Promise.all([
        dispatch({
          type: REMOVE_INVOICES,
        }),
        dispatch({
          type: DESELECT_ALL_INVOICES,
        }),
      ]).then(() => dispatch(getInvoices(routeParams)))
    );
  };
}
