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
export default function Profil(){
//
// DECONNECTER L'USER
//
function profil(data:string){
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
         children="profil"
         fonction={profil}
         data_function={"navigation"}
        />
        </>
    )
}