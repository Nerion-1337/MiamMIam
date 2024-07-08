// DATA
import { Route_Server } from "#1_data/links";
// TYPAGE
import { api_all_recipe } from "#0_types/typages";
//
//
// GET CONVERSATION
//
//
export const GET_CONVERSATION = "GET_CONVERSATION";
//
export const get_all_conversation = ({option}: {[key: string]: string}) => {
//
    return (dispatch: (action: { type: string; payload: {data: api_all_recipe[]}; }) => void) => {
      return fetch(`${Route_Server[0].url}${Route_Server[34].url}`, {
        method: "POST",
        headers: {
            Authorization: `${localStorage.getItem("token_miam_miam")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            option_conversation: option
          }),
      })
        .then((res) => res.json())
        .then((res) => {
          dispatch({type: GET_CONVERSATION, payload: {data: res}})
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
// OPTION CONVERSATION
//
//
export const OPTION_CONVERSATION = "OPTION_CONVERSATION";
//
export const post_option_conversation = (option: string, id: number) => {
//
    return (dispatch: (action: { type: string; payload: {data: api_all_recipe[]}; }) => void) => {
      return fetch(`${Route_Server[0].url}${Route_Server[35].url}`, {
        method: "POST",
        headers: {
            Authorization: `${localStorage.getItem("token_miam_miam")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            option_conversation: option,
            conversation_id: id
          }),
      })
        .then((res) => res.json())
        .then((res) => {
          dispatch({type: OPTION_CONVERSATION, payload: {data: res}})
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
// BLOQUER CONVERSATION
//
//
export const HIDDEN_CONVERSATION = "HIDDEN_CONVERSATION";
//
export const post_hidden_conversation = (id: number) => {
//
    return (dispatch: (action: { type: string; payload: {data: api_all_recipe[]}; }) => void) => {
      return fetch(`${Route_Server[0].url}${Route_Server[36].url}`, {
        method: "POST",
        headers: {
            Authorization: `${localStorage.getItem("token_miam_miam")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            conversation_id: id
          }),
      })
        .then((res) => res.json())
        .then((res) => {
          dispatch({type: HIDDEN_CONVERSATION, payload: {data: res}})
          return true
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    }
  }      