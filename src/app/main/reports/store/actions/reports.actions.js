import axios from 'axios';

export const GET_ADMISSION_REPORT = '[CUSTOMER APP] GET ADMISSION REPORT';
export const GET_CREMATION_REPORT = '[CUSTOMER APP] GET CREMATION REPORT';
export const GET_VAULT_REPORT = '[CUSTOMER APP] GET VAULT REPORT';
export const GET_VOUCHER_REPORT = '[CUSTOMER APP] GET VOUCHER REPORT';

export const FETCH_PROGRESS = '[CUSTOMER APP] FETCH PROGRESS';
export const FETCH_REPORT_ERROR = '[CUSTOMER APP] FETCH REPORT ERROR';

export const SET_SEARCH_TEXT = '[CUSTOMER APP] SET SEARCH TEXT';

export function getAdmissionReports(data) {
  const request = axios.post('/api/v1/reports/admission-form', data);

  return (dispatch) => {
    dispatch({ type: FETCH_PROGRESS })

    request.then((response) => {
      console.log(response, "admission reports response")
      dispatch({
        type: GET_ADMISSION_REPORT,
        payload: response.data.data,
      })
    })
    .catch(err => {
      dispatch({ type: FETCH_REPORT_ERROR })
    });
  }
}

export function getCremationReports(data) {
  const request = axios.post('/api/v1/reports/cremation-form', data);

  return (dispatch) => {
    dispatch({ type: FETCH_PROGRESS })

    request.then((response) => {
      console.log(response, "cremation reports response")
      dispatch({
        type: GET_CREMATION_REPORT,
        payload: response.data.data,
      })
    })
    .catch(err => {
      dispatch({ type: FETCH_REPORT_ERROR })
    });
  }
}

export function getVaultReports(data) {
  const request = axios.post('/api/v1/reports/vault-form', data);

  return (dispatch) => {
    dispatch({ type: FETCH_PROGRESS })

    request.then((response) => {
      console.log(response, "vault reports response")
      dispatch({
        type: GET_VAULT_REPORT,
        payload: response.data.data,
      })
    })
    .catch(err => {
      dispatch({ type: FETCH_REPORT_ERROR })
    });
  }
}

export function getVoucherReports(data) {
  const request = axios.post('/api/v1/reports/voucher-form', data);

  return (dispatch) => {
    dispatch({ type: FETCH_PROGRESS }) 

    request.then((response) => {
      console.log(response, "voucher reports response")
      dispatch({
        type: GET_VOUCHER_REPORT,
        payload: response.data.data,
      })
    })
    .catch(err => {
      dispatch({ type: FETCH_REPORT_ERROR })
    });
  }
}


export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value,
  };
}