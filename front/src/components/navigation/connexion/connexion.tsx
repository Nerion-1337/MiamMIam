// REACT
import { useState } from "react";
// DATA
import { List_icon, Input_connexion, Route_Server } from "#data/links";
// BUILDER
import Button from "#components/build/global/button";
import Typo from "#components/build/global/typography";
import Input from "#components/build/global/input";
//COMPONENTS
import Button_active from "#components/active_redux/button_active";
import Modal_active from "#components/active_redux/modal_active";
// REQUEST
import { login_user } from "#/api/fetch_register_login"
//REDUX
import { store } from '#/reducers/store'
// ACTION
import { token_actif } from "#actions/token_action";
//
//
//
//
//
export default function Connexion(){
//
// VARIABLE
//
const [formData, setFormData] = useState<Record<string, string>>({});
//
//
// FONCTION
//
//
function connexion(){
    login_user(formData)
    .then((isConfirmer: boolean) => {
        if(isConfirmer === true){
            Button_active({data: "connexion", value: false});
            store.dispatch(token_actif());
            Button_active({data:"connecté", value: true});
        }
    })
}
//
// BASCULER SUR FORM INSCRIPTION
//
function inscription(data:string){
    Button_active({data: data, value: true});
    Button_active({ data: "connexion", value: false });
  }
//
// STOCK DONNÉE INPUT
//
const handleChange = (fieldName: string, newValue: string) => {
    setFormData((prevState) => {
        return { ...prevState, [fieldName]: newValue };
      });
  };
//
// RESET PASSWORD
//
const reset_password = () => {
    Modal_active({active: true, number: 2 });
  };
//
//
function connexion_google(){
    window.open(`${Route_Server[0].url}${Route_Server[8].url}`, "_self")
}  
//
// 
// RETURN
//
//    
    return(
        <>
        <section className="body_connexion">
            <div className="bloc_input_connexion">
        <Input
        variant="t1"
        type={Input_connexion[0].type}
        icon={Input_connexion[0].icon}
        text={Input_connexion[0].text}
        element={Input_connexion[0].element}
        variable={Input_connexion[0].variable}
        identifiant={`connexion_${Input_connexion[0].text.replace(/\s/g, '_').toLowerCase()}`}
        fonction={handleChange}
            />
           <div className="bloc_input_mdp">
        <Input
        variant="t1"
        type={Input_connexion[1].type}
        icon={Input_connexion[1].icon}
        text={Input_connexion[1].text}
        variable={Input_connexion[1].variable}
        element={Input_connexion[1].element}
        identifiant={`connexion_${Input_connexion[1].text.replace(/\s/g, '_').toLowerCase()}`}
        fonction={handleChange}
            />
         <Typo
    balise="span"
    size="s2"
    color="cw"
    transform="maj"
    className="mdp_oublie"
    children="mot de passe oublié ?"
    fonction={reset_password}
        />
    </div></div>
    <div className="button_validation">           
        <Button
         variant="t3"
         fontSize="s2"
         children="connexion"
         fonction={connexion}
        />
        <Button
         variant="t2"
         fontSize="s2"
         children="inscription"
         fonction={inscription}
         data_function={"inscription"}
        />
    <Typo
    balise="span"
    size="s7"
    color="cw"
    transform="maj"
    children="ou"
        />

<Button
         variant="t3"
         fontSize="s1"
         className="button_google"
         children="continuer avec"
         icon={List_icon.all[3].icon}
         fonction={connexion_google}
        />
        </div>  
        </section>
        </>
    )  
}