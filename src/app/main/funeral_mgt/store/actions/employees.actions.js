import axios from 'axios';

export const GET_EMPLOYEES = '[VOUCHERS APP] GET EMPLOYEES';

export function getEmployees() {
  const request = axios.get('https://dev.ezoneapps.com/gateway/authserv/api/v1/users/get_by_orgid?orgId=ORG-1619171587122');
  console.log(request, "request employees")

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: GET_EMPLOYEES,
        payload: response.data,
      })
    });
}