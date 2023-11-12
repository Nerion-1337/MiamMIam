// REACT
import { useState } from "react";
// DATA
import { List_icon, Input_inscription, Route_Server } from "#data/links";
// BUILDER
import Button from "#components/build/global/button";
import Typo from "#components/build/global/typography";
import Input from "#components/build/input";
//COMPONENTS
import Button_active from "#components/active_redux/button_active";
import Modal_active from "#components/active_redux/modal_active";
import { validIdentifiant, validPassword, validEmail, validCGV} from "#components/valid_input";
// REQUEST
import { register_user } from "#/api/fetch_register_login"
//
//
//
//
//
export default function Inscription(){
//
//
// VARIABLE
//
//
const [formData, setFormData] = useState<{ [key: string]: string }>({});
const [isCheckboxChecked, setCheckboxChecked] = useState(false);
//
//
// FONCTION
//
//
function connexion(data:string){
    Button_active({data: "inscription", value: false});
    Button_active({data: data, value: true});
  }
//
// 
const handleChange = (fieldName: string, newValue: string) => {
    setFormData((prevState) => {
        return { ...prevState, [fieldName]: newValue };
      });
  };
//
function valid(){
        validIdentifiant("inscription_identifiant")
        validPassword("inscription_mot_de_passe", "inscription_confirmer_mot_de_passe")
        validEmail("inscription_email")
        validCGV(isCheckboxChecked)    
}
//
const handleSubmit = () =>{
        valid();
        if(
            validIdentifiant("inscription_identifiant") === true &&
            validPassword("inscription_mot_de_passe", "inscription_confirmer_mot_de_passe") === true &&
            validEmail("inscription_email") === true &&
            validCGV(isCheckboxChecked) === true
        ){
            register_user(formData)
            .then((isConfirmer: boolean) => {
                if(isConfirmer === true){
                    Modal_active({active: true, number: 0 });
                    Button_active({data:"inscription", value:false});
                    Button_active({data: "connexion", value: true});
                }
            })
        } 
  }
//
//
function inscription_google(){
    window.open(`${Route_Server[0].url}${Route_Server[8].url}`, "_self")
}
//  
//
// BUILDER
//
//  
const contentInput =  Input_inscription.map((input, index)=> (
    <Input
    type={input.type}
    icon={input.icon}
    text={input.text}
    identifiant={`inscription_${input.text.replace(/\s/g, '_').toLowerCase()}`}
    fonction={handleChange}
    key={index}
        />   
))
//
//
//    
    return(
        <>
        <div className="bloc1">
        <section className="body_inscription">
            <form className="bloc_input_inscription">
            {contentInput}
            <div className="inputBoxGlobal input_inscription_cvg">
              <small></small>  
            <div className="input_checkbox">              
            <input 
            type="checkbox" 
            id="cgv" 
            required={true}
            onChange={() => setCheckboxChecked(!isCheckboxChecked)}
            />
            <label className="label_cgv" htmlFor="cgv">
            <div/></label>
         <Typo
    balise="label"
    size="s2"
    color="cw"
    className="condition_utilisation"
    children={(<>J'accepte les <span>conditions d'utilisation</span></>)}
        />
        </div>
        </div>
          <Button
         variant="t3"
         fontSize="s2"
         children="inscription"
         className="input_valid"
         fonction={handleSubmit}
        />
    </form>
    <div className="button_validation">           
        <Button
         variant="t2"
         fontSize="s2"
         children="connexion"
         fonction={connexion}
         data_function={"connexion"}
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
         fonction={inscription_google}
        />
        </div>  
        </section>
        </div>
        </>
    )  
}