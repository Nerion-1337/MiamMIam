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
export default function Accueil(){
//
// DECONNECTER L'USER
//
function accueil(data:string){
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
         variant="t2"
         fontSize="s2"
         children="accueil"
         fonction={accueil}
         data_function={"navigation"}
        />
        </>
    )
}