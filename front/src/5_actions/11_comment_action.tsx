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
export const GET_COMMENT = "GET_COMMENT";
//
export const get_comment_recipe = ( id: string) => {
//
    return (dispatch: (action: { type: string; payload: {data: api_all_recipe[]}; }) => void) => {
      return fetch(`${Route_Server[0].url}${Route_Server[26].url}`, {
        method: "GET",
        headers: {
          recipe: `${id}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          dispatch({type: GET_COMMENT, payload: {data: res}})
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
export const POST_LIKE_COMMENT = "POST_LIKE_COMMENT";
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
          dispatch({type: POST_LIKE_COMMENT, payload: {data: res}})
          return true  
        })
        .catch((err) => console.log(err));
    }
  } 
//
//
// POST COMMENT
//
//
export const POST_COMMENT = "POST_COMMENT";
//
export function send_comment(formData: api){
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
    formDatas.append('comment', formData.img)
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
      return fetch(`${Route_Server[0].url}${Route_Server[29].url}`, {
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
            dispatch({type: POST_COMMENT, payload: {data: res}})
            return true
            }         
         })
         .catch((err) => console.log(err));
 }
}