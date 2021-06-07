import axios from 'axios';

export const GET_DECEASED_RELATIVES = '[CUSTOMER APP] GET DECEASED RELATIVES';
export const GET_RELATIVE_BY_ID = '[CUSTOMER APP] GET RELATIVE BY ID';

export function getDeceasedRelatives(id) {
  const request = axios.get('/api/v1/relatives/deceased_id/' + id);

  console.log(request, "get relatives request")

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: GET_DECEASED_RELATIVES,
        payload: response.data.data,
      })
    });
}

export function getRelativeById(id) {
  const request = axios.get('/api/v1/relatives/' + id);

  console.log(request, "get relative by id request")

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: GET_RELATIVE_BY_ID,
        payload: response.data.data,
      })
    });
}