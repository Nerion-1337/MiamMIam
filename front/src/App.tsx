
// BUILDER
import Modal from "#/components/build/global/modal";
import Header from "#/components/build/header";
import Nav from "#components/navigation/navigation_main";
import Signalement from "#components/modal/signalement";
// DATA
import { Route_Client } from "#1_data/links";
// PAGE
import Error from "#page/error";
// REACT
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
// REDUX
import { store } from '#4_reducers/0_store'
import { useSelector } from "react-redux";
//ACTION
import { token_actif } from "#5_actions/2_token_action";
// TYPAGE
import { modal_reducer, modal_action, button_reducer, object_button_reducer} from "#0_types/typages";
//
//
//
//
//
function App() {
//
//
// VARIABLE
//
//
const table: modal_action[] = useSelector((state:  modal_reducer) => state.modalReducer);
const button = useSelector((state:  button_reducer) => state.buttonReducer);
//
let type_modal: modal_action | null = null;
let signalement_active: object_button_reducer | null = null; 
//
//
// FUNCTION
//
//
useEffect(() => {
  store.dispatch(token_actif());
}, []);
//
// BOUCLE POUR ALL MODAL
for (const item of table) {
        if (item.active === true) {
            type_modal = item;
            break;
        }
}
// BOUCLE POUR ALL MODAL
for (const item of button) {
  if (item.value === true && item.name === "signalement") {
    signalement_active = item;
      break;
  }
}
//
//
// BUILD
//
//
const routeContent = Route_Client.map((item, index) =>(
  <Route path={item.url} element={item.page} key={index} />
))
//
const contentModal = (
  <>
    {type_modal &&(
    <Modal 
    active={type_modal.active} 
    number={type_modal.number} 
    text={type_modal.text}
    />
  )} 
  </>
)
//
const contentSignalement = (
  <> 
{signalement_active && (
  <Signalement/>
)}
</>
)  
//
//
const navigationContent = (
  <BrowserRouter>
  {contentModal}
  {contentSignalement}
  <Header />
  <Nav />
  <Routes>
  {routeContent}
  </Routes>
</BrowserRouter>
)
//
//
// RETURN
//
//

    return (
<>
{Route_Client ? (
  navigationContent
) : (
  <Error id="1337" errorText="Error system !" nolink={true}/>
)}
</>
    );
}

export default App;
