import axios from 'axios';
import { showMessage } from '../../../../store/actions/fuse';
import * as Actions from '.';
import history from "../../../../../@history"

export const CREATE_DECEASED = '[CUSTOMER APP] CREATE DECEASED';
export const UPDATE_DECEASED = '[CUSTOMER APP] UPDATE DECEASED';
export const GET_ALL_DECEASED = '[CUSTOMER APP] GET ALL DECEASED';
export const GET_DECEASED_BY_ID = '[CUSTOMER APP] GET DECEASED BY ID';

export const SET_SEARCH_TEXT = '[CUSTOMER APP] SET SEARCH TEXT';

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