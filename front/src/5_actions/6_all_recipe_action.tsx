// DATA
import { Route_Server } from "#1_data/links";
// TYPAGE
import { api, api_all_recipe } from "#0_types/typages";
//
//
// GET 
//
//
export const GET_ALL_RECIPE = "GET_ALL_RECIPE";
//
export const get_all_recipe = (server: number, formDataArray?: {[key: string]: api[]}, formData?: { [key: string]: string} ) => {
//
// COMBINE LES DATAS
  let formDatas: { [key: string]: string | api[]; };
  if(formData && formData.research){
    formDatas = { ...formDataArray, ...formData }
  } else if (formData){
 // SUPPRIMER DATA RESEARCH QUAND IL EST NUL   
    const { research, ...formDataWithoutResearch } = formData;
    formDatas = { ...formDataArray, ...formDataWithoutResearch };
  } else{
    formDatas = { ...formDataArray}
  }
//
// ADAPTE HEADERS REQUETE SELON LA ROUTE SERVER VOULU
let header: { Authorization?: string; "Content-Type": string; };  
//
if(server === 22){
header = {
  Authorization: `${localStorage.getItem("token_miam_miam")}`,
  "Content-Type": "application/json",
} 
}else{
  header = {
    "Content-Type": "application/json",
  } 
}
//
//
  return (dispatch: (action: { type: string; payload: {data: api_all_recipe[]}; }) => void) => {
    return fetch(`${Route_Server[0].url}${Route_Server[server].url}`, {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        formData: formDatas
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({type: GET_ALL_RECIPE, payload: {data: res}})
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
export const POST_LIKE_FOLLOW_RECIPE = "POST_LIKE_FOLLOW_RECIPE";
//
export const like_follow_recipe = ( formData: { [key: string]: number }) => {
//
    return (dispatch: (action: { type: string; payload: {data: api_all_recipe[]}; }) => void) => {
      return fetch(`${Route_Server[0].url}${Route_Server[17].url}`, {
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
          dispatch({type: POST_LIKE_FOLLOW_RECIPE, payload: {data: res}})
          return true
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    }
  }