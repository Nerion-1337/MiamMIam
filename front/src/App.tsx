// REACT
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
// DATA
import { Route_Client } from "#data/links";
// PAGE
import Error from "#page/error";
// BUILDER
import Modal from "#/components/build/global/modal";
import Header from "#/components/build/header";
import Nav from "#components/navigation/navigation_main";
// REDUX
import { store } from '#/reducers/store'
import { useSelector } from "react-redux";
//ACTION
import { token_actif } from "#actions/token_action";
// TYPAGE
import { modal_reducer, modal_action} from "#types/typages";
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
//
//
// FUNCTION
//
//
useEffect(() => {
  store.dispatch(token_actif());
}, []);
//
//
let type_modal: modal_action | null = null;
for (const item of table) {
        if (item.active === true) {
            type_modal = item;
            break;
        }
}
//
//
//
// BUILD
//
//
const routeContent = Route_Client.map((item, index) =>(
  <Route path={item.url} element={item.page} key={index} />
))
//
//
const navigationContent = (
  <BrowserRouter>
  {type_modal &&(
    <Modal active={type_modal.active} number={type_modal.number} text={type_modal.text}/>
  )} 
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
