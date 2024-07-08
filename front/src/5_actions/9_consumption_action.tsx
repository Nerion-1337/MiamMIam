// DATA
import { Route_Server, Links_Server } from "#1_data/links";
// TYPAGE
import { api_number } from "#0_types/typages";
//
//
// GET CONSUMPTION
//
//
export const GET_CONSUMPTION_USER = "GET_CONSUMPTION_USER";
//
export const get_consumption = (element: string) => {
  return (dispatch: (action: { type: string; payload: api_number; }) => void) => {
    return fetch(`${Route_Server[0].url}${Route_Server[23].url}`, {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token_miam_miam")}`,
        consumption_time: element,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({type: GET_CONSUMPTION_USER, payload: res})
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
// POST CONSUMPTION
//
//
export const POST_CONSUMPTION_USER = "POST_CONSUMPTION_USER";
//
export const post_consumption = (recipe_id: number, pourcentage: number) => {
  return (dispatch: (action: { type: string; payload: api_number; }) => void) => {
    return fetch(`${Route_Server[0].url}${Route_Server[24].url}`, {
      method: "POST",
      headers: {
        Authorization: `${localStorage.getItem("token_miam_miam")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [Links_Server[16].recette_id]: recipe_id,
        [Links_Server[16].pourcentage]: pourcentage,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({type: POST_CONSUMPTION_USER, payload: res})
        return true
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
}