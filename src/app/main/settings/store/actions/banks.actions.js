import axios from 'axios';
import { baseURL } from '../../../../fuse-configs/axiosConfig';

export const GET_BANKS = '[SETTINGS APP] GET_BANKS';
export const GET_BANKS_ERROR = '[SETTINGS APP] GET_BANKS_ERROR';

export function getBanks() {
  const request = axios.get(`${baseURL}/authserv/api/v1/banks`);
  return (dispatch) => {
    request
      .then((response) => {
        console.log(response, 'banks response');
        dispatch({
          type: GET_BANKS,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({ type: GET_BANKS_ERROR });
      });
  };
}
