// DATA
import { Route_Server, Input_add_recipe } from "#data/links";
// TYPAGE
import { api, api_element_recipe } from "#types/typages";
// COMPONENT
import Modal_active from "#components/active_redux/modal_active";
//
//
// POST RECETTE
//
//
export function post_recipe(formData: api, formDataArray: api_element_recipe){
  
    //
    // VARIABLE
    //
    const formDatas = new FormData();

    //
    // BOUCLE formData
    //
    Object.keys(formData).forEach(key => {
    //
    // CAS IMAGE NON OBLIGATOIRE 
      if(key === Input_add_recipe[4].variable){
        formDatas.append('recette_media', formData[Input_add_recipe[4].variable])
   //
   // CAS IMAGE OBLIGATOIRE 
      } else if(key === Input_add_recipe[3].variable){  
        formDatas.append('recette_presentation', formData[Input_add_recipe[3].variable])
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
    // RETURN
    //  

    console.log(formDatas)
          return fetch(`${Route_Server[0].url}${Route_Server[15].url}`, {
             method: 'POST',
             headers: {
               Authorization: `${localStorage.getItem("token_miam_miam")}`,
             },
             body: formDatas,
           })
             .then((res) => res.json())
             .then((res) => {
               if(res === "Recette ajouté !"){ 
                return true   
               } else if(res.error_duplicate){  
                Modal_active({active: true, number: 1, text: res.error_duplicate });
               } else if(res.error_img){  
                Modal_active({active: true, number: 1, text: res.error_img });
               } else if(res.error_prepa){  
                Modal_active({active: true, number: 1, text: res.error_prepa });
               } else if(res.error_contenu){  
                Modal_active({active: true, number: 1, text: res.error_contenu });
               } else {
                 return false
               } 
           
             })
             .catch((err) => console.log(err));
    }