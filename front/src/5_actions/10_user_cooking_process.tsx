// DATA
import { Route_Server } from "#1_data/links";
// TYPAGE
import { api } from "#0_types/typages";
//
//
// POST LIKE & FOLLOW
//
//
export const GET_COOKING_PROCESS = "GET_COOKING_PROCESS";
//
export const cooking_process_recipe = ( id: string) => {
//
    return (dispatch: (action: { type: string; payload: api; }) => void) => {
      return fetch(`${Route_Server[0].url}${Route_Server[25].url}`, {
        method: "GET",
        headers: {
          id: `${id}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          dispatch({type: GET_COOKING_PROCESS, payload: res})
          return true
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    }
  }