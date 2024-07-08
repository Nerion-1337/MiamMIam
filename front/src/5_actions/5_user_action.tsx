// DATA
import { Route_Server, Route_Assets, Input_setting } from "#1_data/links"
// TYPAGE
import { api } from "#0_types/typages";
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
// GET
//
//  
export const GET_USER = "GET_USER";
//
export const getMy = () => {  
    return (dispatch: (action: { type: string; payload: api; }) => void) => {
        return fetch(`${Route_Server[0].url}${Route_Server[7].url}`, {
            method: 'GET',
            headers:{
              Authorization: `${localStorage.getItem("token_miam_miam")}`
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
export const getUser = (id_user: string) => {  
  return (dispatch: (action: { type: string; payload: api; }) => void) => {
      return fetch(`${Route_Server[0].url}${Route_Server[18].url}`, {
          method: 'GET',
          headers:{
            id_user: `${id_user}`
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
// PUT
//
//
export const PUT_USER = "PUT_USER";
//
export const putMy = (formData: api) => {  
//
// VARIABLE
//
const formDatas = new FormData();
const formDataReducer: api = {};
//
// BOUCLE
//
Object.keys(formData).forEach(key => {
//
// CAS IMAGE  
  if(key === "photo_profil"){
    formDatas.append('user', formData[Input_setting[11].variable])
    const file = formData[Input_setting[11].variable];
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore    
    if (file instanceof File){
      formDataReducer['photo_profil'] = `${Route_Assets[0].url}${Route_Assets[1].url}${file.name.split(' ').join('_')}`;
    }
//    
// TOUTE LES AUTRES DONNÉES    
  } else {
    formDatas.append(key, formData[key]);
    formDataReducer[key] = formData[key];
  }
});
//
// RETURN
//
    return (dispatch: (action: { type: string; payload: api; }) => void) => {
         return fetch(`${Route_Server[0].url}${Route_Server[9].url}`, {
            method: 'PUT',
            headers: {
              Authorization: `${localStorage.getItem("token_miam_miam")}`,
            },
            body: formDatas,
          })
            .then((res) => res.json())
            .then((res) => {
              if(res === "Mise à Jour"){
                dispatch({type: PUT_USER, payload: formDataReducer})
               return true     
              } else {
                return false
              } 
          
            })
            .catch((err) => console.log(err));
    }
}
//
//
// POST LIKE & FOLLOW
//
//
export const POST_FOLLOW_USER = "POST_FOLLOW_USER";
//
export const follow_user = ( formData: string ) => {
//
    return (dispatch: (action: { type: string; payload: api; }) => void) => {
      return fetch(`${Route_Server[0].url}${Route_Server[19].url}`, {
        method: "POST",
        headers: {
          Authorization: `${localStorage.getItem("token_miam_miam")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_follow: formData
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          dispatch({type: POST_FOLLOW_USER, payload: {data: res}})
          return true
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    }
  }