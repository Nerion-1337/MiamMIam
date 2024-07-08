// COMPONENT
import Modal_active from "#components/active_redux/modal_active";
// DATA
import { Route_Server } from "#1_data/links";
// TYPAGE
import { api_all_recipe, api } from "#0_types/typages";
//
//
// GET  COMMENT
//
//
export const GET_ALL_USER = "GET_ALL_USER";
//
export const get_all_user = () => {
//
    return (dispatch: (action: { type: string; payload: {data: api_all_recipe[]}; }) => void) => {
      return fetch(`${Route_Server[0].url}${Route_Server[30].url}`, {
        method: "GET",
        headers: {
            Authorization: `${localStorage.getItem("token_miam_miam")}`,
          },
      })
        .then((res) => res.json())
        .then((res) => {
          dispatch({type: GET_ALL_USER, payload: {data: res}})
          return true
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    }
  }