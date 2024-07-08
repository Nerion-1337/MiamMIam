// BUILDER
import Button from "#components/build/global/button";
//COMPONENTS
import Button_active from "#components/active_redux/button_active";
//REDUX
import { store } from '#4_reducers/0_store'
// ACTION
import { token_actif } from "#5_actions/2_token_action";
//
//
//
//
//
export default function Deconnexion(){
//
// DECONNECTER L'USER
//
function deconnexion(data:string){
    Button_active({data: data, value: false});
    localStorage.removeItem('token_miam_miam');
    document.cookie = encodeURIComponent("token_miam_miam") + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
    store.dispatch(token_actif());
  }
//
// 
// RETURN
//
//   
    return(
        <>
        <Button
         variant="t5"
         fontSize="s2"
         children="deconnexion"
         fonction={deconnexion}
         data_function={"navigation"}
        />
        </>
    )
}