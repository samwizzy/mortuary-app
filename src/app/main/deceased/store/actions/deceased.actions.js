import axios from 'axios';
import { showMessage } from '../../../../store/actions/fuse';
import * as Actions from '.';
import history from "../../../../../@history"

export const CREATE_DECEASED = '[DECEASED APP] CREATE DECEASED';
export const UPDATE_DECEASED = '[DECEASED APP] UPDATE DECEASED';
export const GET_ALL_DECEASED = '[DECEASED APP] GET ALL DECEASED';
export const GET_DECEASED_BY_ID = '[DECEASED APP] GET DECEASED BY ID';

export const PRINT_ADMISSION_FORM = '[DECEASED APP] PRINT ADMISSION FORM';
export const PRINT_EMBALMMENT_CERTIFICATE = '[DECEASED APP] PRINT EMBALMMENT CERTIFICATE';
export const PRINT_CREMATION_CERTIFICATE = '[DECEASED APP] PRINT CREMATION CERTIFICATE';

export const ADD_RELEASE_FORM = '[DECEASED APP] ADD RELEASE FORM';
export const GET_RELEASED_FORMS = '[DECEASED APP] GET RELEASED FORMS';

export const SET_SEARCH_TEXT = '[DECEASED APP] SET SEARCH TEXT';

export function createDeceased(data) {
  const request = axios.post('/api/v1/deceased', data);
  console.log(request, 'creating deceased request');

  return (dispatch) => {
    request.then((response) => {
      if (response.status === 200) {
        dispatch(showMessage({ message: 'Deceased created successfully' }));

        Promise.all([
          dispatch({
            type: CREATE_DECEASED,
            payload: response.data,
          }),
        ]).then(() => {
          dispatch(Actions.getAllDeceased());
          history.push("/deceased")
        });
      } else {
        dispatch(showMessage({ message: 'Deceased creation failed' }));
      }
    });
  };
}

export function addReleaseForm(data, id) {
  const request = axios.post(`/api/v1/forms/deceased_id/${id}/release_form`, data);
  console.log(request, 'addReleaseForm request');

  return (dispatch) => {
    request.then((response) => {
      if (response.status === 200) {
        dispatch(showMessage({ message: 'Corpse release form created successfully' }));

        Promise.all([
          dispatch({
            type: ADD_RELEASE_FORM,
            payload: response.data,
          }),
        ]).then(() => {
          dispatch(Actions.getAllDeceased());
          history.push(`/deceased/${id}`)
        });
      } else {
        dispatch(showMessage({ message: 'Corpse release form creation failed' }));
      }
    });
  };
}

export function getAllDeceased(page=0, size=10) {
  const request = axios.get('/api/v1/deceased', { params: {page, size} });

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: GET_ALL_DECEASED,
        payload: response.data.data,
      })
    });
}

export function getDeceasedById(id) {
  const request = axios.get('/api/v1/deceased/' + id);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_DECEASED_BY_ID,
        payload: response.data.data,
      })
    );
}

export function printAdmissionForm(id) {
  const request = axios.get(`/api/v1/forms/deceased_id/${id}/print_admission_form`);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: PRINT_ADMISSION_FORM,
        payload: response.data.data,
      })
    );
}

export function printEmbalmmentCertificate(id) {
  const request = axios.get(`/api/v1/forms/deceased_id/${id}/print_embalming_certificate`);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: PRINT_EMBALMMENT_CERTIFICATE,
        payload: response.data.data,
      })
    );
}

export function printCremationCertificate(id) {
  const request = axios.get(`/api/v1/forms/deceased_id/${id}/print_cremation_certificate`);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: PRINT_CREMATION_CERTIFICATE,
        payload: response.data.data,
      })
    );
}

export function getReleasedForms(page=0, size=10) {
  const request = axios.get('/api/v1/forms/release_forms', { params: {page, size} });

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: GET_RELEASED_FORMS,
        payload: response.data.data,
      })
    });
}

export function updateDeceased(data) {
  const request = axios.put('/api/v1/deceased', data);

  return (dispatch) => {
    request.then((response) => {
      if (response.status === 200) {
        dispatch(showMessage({ message: 'Deceased updated successfully' }));

        Promise.all([
          dispatch({
            type: UPDATE_DECEASED,
            payload: response.data,
          }),
        ]).then(() => dispatch(Actions.getAllDeceased()));
      } else {
        dispatch(showMessage({ message: 'Deceased update failed' }));
      }
    });
  };
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value,
  };
}
