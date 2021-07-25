import axios from 'axios';
import store from "app/store"

export const GET_BRANCHES = '[VOUCHERS APP] GET BRANCHES';

export function getBranches() {
  const user = store.getState().auth.user.data;
  console.log(user, "getState")
  const request = axios.get(`https://dev.ezoneapps.com/gateway/authserv/api/v1/organisation_and_tag/parties?tagId=1&orgId=${user.organisation?.id || 60}`);

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: GET_BRANCHES,
        payload: response.data,
      })
    });
}