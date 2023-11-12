// DATA
import { Input_inscription } from "#data/links";
// REACT
import { useParams } from "react-router-dom";
import { useState  } from "react";
// REQUEST
import { reset_password } from "#/api/fetch_register_login"
// BUILDER
import Button from "#components/build/global/button";
import Typo from "#components/build/global/typography";
import Input from "#components/build/input";
//COMPONENTS
import Modal_active from "#components/active_redux/modal_active";
import { validPassword } from "#components/valid_input";
//
//
//
//
//
export default function Reset_password() {
//
//
// VARIABLE
//
//    
    const { token } = useParams();
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
//
//
// FUNCTION
//
//
const handleChange = (fieldName: string, newValue: string) => {
    setFormData((prevState) => {
        return { ...prevState, [fieldName]: newValue };
      });
  };
//
function valid(){
    validPassword("reste_password_mot_de_passe", "reste_password_confirmer_mot_de_passe")
}
//
const handleSubmit = () =>{
    valid();
    if(
        validPassword("reste_password_mot_de_passe", "reste_password_confirmer_mot_de_passe") === true 
    ){
        reset_password(formData, token)
        .then((isConfirmer: boolean ) => {
            if(isConfirmer === true){
                Modal_active({active: true, number: 3 });
            }
        })
    } 
}  
//  
//
// BUILDER
//
//  
const contentInput =  Input_inscription.slice(1, 3).map((input, index)=> (
    <Input
    type={input.type}
    icon={input.icon}
    text={input.text}
    identifiant={`reste_password_${input.text.replace(/\s/g, '_').toLowerCase()}`}
    fonction={handleChange}
    key={index}
        />   
))
//
//
//
//
//
    return (
        <main className="reset_password">
            <section>
            <Typo
            balise="span"
            size="s7"
            color="cb"
            transform="maj"
            children="Entrez votre nouveau mot de passe."
            />
           {contentInput}
            <Button
            variant="t2"
            fontSize="s2"
            children="Envoyer"
            fonction={handleSubmit}
            />
            </section>
        </main>
    );
}