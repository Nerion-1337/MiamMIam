// COMPONENT
import Modal_active from "#components/active_redux/modal_active";
// DATA
import { Route_Server } from "#1_data/links";
// TYPAGE
import { api_all_recipe, api } from "#0_types/typages";
//
//
// GET MESSAGE
//
//
export const GET_MESSAGE = "GET_MESSAGE";
//
export const get_message = ( id: number) => {
//
    return (dispatch: (action: { type: string; payload: {data: api_all_recipe[]}; }) => void) => {
      return fetch(`${Route_Server[0].url}${Route_Server[32].url}`, {
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
          dispatch({type: GET_MESSAGE, payload: {data: res}})
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
// POST LIKE & FOLLOW
//
//
export const POST_LIKE_MESSAGE = "POST_LIKE_MESSAGE";
//
export const like_comment = ( formData: { [key: string]: string }) => {
//
    return (dispatch: (action: { type: string; payload: api; }) => void) => {
      return fetch(`${Route_Server[0].url}${Route_Server[27].url}`, {
        method: "POST",
        headers: {
          Authorization: `${localStorage.getItem("token_miam_miam")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: formData
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          dispatch({type: POST_LIKE_MESSAGE, payload: {data: res}})
          return true  
        })
        .catch((err) => console.log(err));
    }
  } 
//
//
// POST MESSAGE
//
//
export const POST_MESSAGE = "POST_MESSAGE";
//
export function send_message(formData: api){
//
// VARIABLE
//
const formDatas = new FormData();

//
// BOUCLE formData
//
Object.keys(formData).forEach(key => {
//
// CAS IMAGE  
  if(key === "img"){
    formDatas.append('message', formData.img)
//    
// TOUTE LES AUTRES DONNÉES    
  } else {
    formDatas.append(key, formData[key]);
  }
});
//
//
// RETURN
//
//  
    return (dispatch: (action: { type: string; payload: {data: api_all_recipe[]}; }) => void) => {
      return fetch(`${Route_Server[0].url}${Route_Server[33].url}`, {
         method: 'POST',
         headers: {
           Authorization: `${localStorage.getItem("token_miam_miam")}`,
         },
         body: formDatas,
       })
         .then((res) => res.json())
         .then((res) => {
          if(res.publish_comment){
            Modal_active({active: true, number: 1, text: res.publish_comment});
            return false  
          }else{
            dispatch({type: POST_MESSAGE, payload: {data: res}})
            return true
            }         
         })
         .catch((err) => console.log(err));
 }
}