// DATA
import { Route_Server } from "#1_data/links";
// TYPAGE
import { api_element_recipe } from "#0_types/typages";
//
//
// GET RECIPE
//
//
export const GET_VERIFY_L_F = "GET_VERIFY_L_F";
//
export const get_verify_l_f = () => {
  return (dispatch: (action: { type: string; payload: api_element_recipe; }) => void) => {
    return fetch(`${Route_Server[0].url}${Route_Server[20].url}`, {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token_miam_miam")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
       dispatch({type: GET_VERIFY_L_F, payload: {key: res.element, data: res.data}})
        return true
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
}
//
//
// GET USER
//
//
export const get_verify_f_user = () => {
  return (dispatch: (action: { type: string; payload: api_element_recipe; }) => void) => {
    return fetch(`${Route_Server[0].url}${Route_Server[21].url}`, {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token_miam_miam")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
       dispatch({type: GET_VERIFY_L_F, payload: {key: res.element, data: res.data}})
        return true
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
}
//
//
// GET USER
//
//
export const get_verify_l_comment = () => {
  return (dispatch: (action: { type: string; payload: api_element_recipe; }) => void) => {
    return fetch(`${Route_Server[0].url}${Route_Server[28].url}`, {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token_miam_miam")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
       dispatch({type: GET_VERIFY_L_F, payload: {key: res.element, data: res.data}})
        return true
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
}