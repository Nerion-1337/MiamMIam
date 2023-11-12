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
export default function Dashboard(){
//
// DECONNECTER L'USER
//
function dashboard(data:string){
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
         children="Dashboard"
         fonction={dashboard}
         data_function={"navigation"}
        />
        </>
    )
}