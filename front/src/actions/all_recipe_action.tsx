// DATA
import { Route_Server } from "#data/links";
// TYPAGE
import { api } from "#types/typages";
// COMPONENT
import Modal_active from "#components/active_redux/modal_active";
//
//
// GET 
//
//
export const GET_ALL_RECIPE = "GET_ALL_RECIPE";
//
export const get_all_recipe = (formDataArray: {[key: string]: api[]}, formData: { [key: string]: string }) => {
//
// COMBINE LES DATAS
  let formDatas: { [key: string]: string | api[]; };
  if(formData.research){
    formDatas = { ...formDataArray, ...formData }
  } else{
 // SUPPRIMER DATA RESEARCH QUAND IL EST NUL   
    const { research, ...formDataWithoutResearch } = formData;
    formDatas = { ...formDataArray, ...formDataWithoutResearch };
  }
  console.log(formDatas)
//
//
  return (dispatch: (action: { type: string; payload: api; }) => void) => {
    return fetch(`${Route_Server[0].url}${Route_Server[16].url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
  //
    return (dispatch: (action: { type: string; payload: api; }) => void) => {
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