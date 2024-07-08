// DATA
import { Route_Server, Input_add_ingredient, Input_add_ustensil } from "#1_data/links";
// TYPAGE
import { api, api_element_recipe } from "#0_types/typages";
// COMPONENT
import Modal_active from "#components/active_redux/modal_active";
//
//
// GET 
//
//
export const GET_ELEMENT_RECIPE = "GET_ELEMENT_RECIPE";
//
export const get_element = (element: string) => {
  return (dispatch: (action: { type: string; payload: api; }) => void) => {
    return fetch(`${Route_Server[0].url}${Route_Server[12].url}`, {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token_miam_miam")}`,
        element_recipe: element,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({type: GET_ELEMENT_RECIPE, payload: {key: res.element, data: res.data}})
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
// POST INGREDIENT
//
//
export const PUT_ELEMENT_RECIPE = "PUT_ELEMENT_RECIPE";
//
export function post_ingredient(formData: api, formDataArray: api_element_recipe){
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
  if(key === Input_add_ingredient[7].variable){
    formDatas.append('ingredient', formData[Input_add_ingredient[7].variable])
//    
// TOUTE LES AUTRES DONNÉES    
  } else {
    formDatas.append(key, formData[key]);
  }
});
//
// BOUCLE formDataArray
//
Object.keys(formDataArray).forEach(key => {
  formDataArray[key].forEach(item => {
      formDatas.append(key, JSON.stringify(item));
  });
});
//
//
//
let value: api;
if(formData.marque){
  value = {
    name: formData.name,
    marque: formData.marque};
} else {
  value = {
    name: formData.name,
    marque: "natif"};
}
//
// RETURN
//  
    return (dispatch: (action: { type: string; payload: {key: string, data: api}; }) => void) => {
      return fetch(`${Route_Server[0].url}${Route_Server[13].url}`, {
         method: 'POST',
         headers: {
           Authorization: `${localStorage.getItem("token_miam_miam")}`,
         },
         body: formDatas,
       })
         .then((res) => res.json())
         .then((res) => {
           if(res === "Ingredient ajouté !"){
            dispatch({type: PUT_ELEMENT_RECIPE, payload: {key: "ingredient", data: value}})  
            return true  
           }else if(res.error_duplicate){
            Modal_active({active: true, number: 1, text: res.error_duplicate });
            return false
          }else if(res.error_img){
            Modal_active({active: true, number: 1, text: res.img });    
            return false
           } else {
             return false
           } 
       
         })
         .catch((err) => console.log(err));
 }
}
//
//
// POST USTENSIL
//
//
//
export function post_ustensil(formData: api){
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
  if(key === Input_add_ustensil[3].variable){
    formDatas.append('ustensil', formData[Input_add_ustensil[3].variable])
//    
// TOUTE LES AUTRES DONNÉES    
  } else {
    formDatas.append(key, formData[key]);
  }
});
//
// RETURN
//  
    return (dispatch: (action: { type: string; payload: {key: string, data: api}; }) => void) => {
      return fetch(`${Route_Server[0].url}${Route_Server[14].url}`, {
         method: 'POST',
         headers: {
           Authorization: `${localStorage.getItem("token_miam_miam")}`,
         },
         body: formDatas,
       })
         .then((res) => res.json())
         .then((res) => {
           if(res === "Ustensil ajouté !"){
            dispatch({type: PUT_ELEMENT_RECIPE, payload: {key: "ustensil", data: {name: formData.name}}})  
            return true
          }else if(res.error_duplicate){
            Modal_active({active: true, number: 1, text: res.error_duplicate });
            return false
          }else if(res.error_img){
            Modal_active({active: true, number: 1, text: res.img });       
           } else {
             return false
           }
         })
         .catch((err) => console.log(err));
 }
}