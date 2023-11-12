// BUILDER
import Button from "#components/build/global/button";
//COMPONENTS
import Button_active from "#components/active_redux/button_active";
//REDUX
import { store } from '#/reducers/store'
import { resetUser } from '#/actions/user_action'
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