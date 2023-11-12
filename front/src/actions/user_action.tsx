// DATA
import { Route_Server } from "#/data/links"
// TYPAGE
import { get_user } from "#types/typages";
//
//
//
export const RESET_USER = "RESET_USER";
//
export const resetUser = () => {
  localStorage.removeItem('token_miam_miam');
  document.cookie = encodeURIComponent("token_miam_miam") + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";  
  return {
    type: RESET_USER,
  };
}
//
//
//
//
//  
export const GET_USER = "GET_USER";
//
export const getUser = () => {
    return (dispatch: (action: { type: string; payload: get_user; }) => void) => {
        return fetch(`${Route_Server[0].url}${Route_Server[7].url}`, {
            method: 'GET',
            headers: {
              Authorization: `${localStorage.getItem("token_miam_miam")}`,
              'Content-Type': 'application/json',
            },
          })
            .then((res) => res.json())
            .then((res) => {
                dispatch({type: GET_USER, payload: res})
            })
            .catch((err) => console.log(err));
    }
}
//
//
//
