import axios from 'axios';

export const GET_INVOICES = '[INVOICES APP] GET INVOICES';
export const SET_SEARCH_TEXT = '[INVOICES APP] SET SEARCH TEXT';

export const SELECT_ALL_INVOICES = '[INVOICES APP] SELECT ALL INVOICES';
export const DESELECT_ALL_INVOICES = '[INVOICES APP] DESELECT ALL INVOICES';
export const OPEN_NEW_INVOICE_DIALOG = '[INVOICES APP] OPEN NEW INVOICE DIALOG';
export const CLOSE_NEW_INVOICE_DIALOG =
  '[INVOICES APP] CLOSE NEW INVOICE DIALOG';
export const OPEN_EDIT_INVOICE_DIALOG =
  '[INVOICES APP] OPEN EDIT INVOICE DIALOG';
export const CLOSE_EDIT_INVOICE_DIALOG =
  '[INVOICES APP] CLOSE EDIT INVOICE DIALOG';
export const ADD_INVOICE = '[INVOICES APP] ADD INVOICE';
export const UPDATE_INVOICE = '[INVOICES APP] UPDATE INVOICE';
export const REMOVE_INVOICE = '[INVOICES APP] REMOVE INVOICE';
export const REMOVE_INVOICES = '[INVOICES APP] REMOVE INVOICES';

export function getInvoices(routeParams) {
  const request = axios.get('/api/invoices', {
    params: routeParams,
  });

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_INVOICES,
        payload: response.data,
        routeParams,
      })
    );
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value,
  };
}

export function selectAllInvoices() {
  return {
    type: SELECT_ALL_INVOICES,
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

export function addInvoice(newInvoice) {
  return (dispatch, getState) => {
    const { routeParams } = getState().invoiceApp.invoices;

    const request = axios.post('/api/add-invoice', {
      newInvoice,
    });

    return request.then((response) =>
      Promise.all([
        dispatch({
          type: ADD_INVOICE,
        }),
      ]).then(() => dispatch(getInvoices(routeParams)))
    );
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
