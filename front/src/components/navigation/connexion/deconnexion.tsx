// BUILDER
import Button from "#components/build/global/button";
//COMPONENTS
import Button_active from "#components/active_redux/button_active";
//REDUX
import { store } from '#/reducers/store'
// ACTION
import { resetUser } from '#/actions/user_action'
import { token_actif } from "#actions/token_action";
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
    store.dispatch(resetUser()); 
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