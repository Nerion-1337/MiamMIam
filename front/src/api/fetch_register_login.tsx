// DATA
import { Route_Server } from "#data/links";
// BUILDER
import Typo from "#components/build/global/typography";
//COMPONENTS
import { setErreur, setValid } from "#components/valid_input";
import { Renvoie_email_modal } from "#components/modal/modal_function";
// TYPAGE
import { registerUser, loginUser } from "#types/typages";
//
//
// REGISTER
//
//
export function register_user(formData: registerUser): Promise<boolean>{

   return fetch(`${Route_Server[0].url}${Route_Server[1].url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifiant: formData.identifiant,
          password: formData.mot_de_passe,
          email: formData.email,
        }),
      })
        .then((res) => res.json())
        .then((res) => {          
          if (res === "L'email existe déjà!") {
            setValid("inscription_identifiant")
            setErreur("inscription_email", res)
            return false
          } else if(res === "L'utilisateur existe déjà!"){
            setValid("inscription_email")
            setErreur("inscription_identifiant", res)
            return false
          } else if(res === "Utilisateur créé."){
            return true
          } else {
            console.log(res)
            return false
          }
        })
        .catch((err) => {
          console.log(err);
          return false
        });
}
//
//
// CONFIRM EMAIL
//
//
export function confirm_email(token_Email: string): Promise<string> {
  
  return fetch(`${Route_Server[0].url}${Route_Server[2].url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token_Email,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if(res.error_token){
        return res.error_token
      } else {
        return res;
      }
    })
    .catch((err) => {
      console.log(err);
      return "error";
    });
}
//
//
// RENVOIE EMAIL
//
//
export function renvoie_email(email: string): Promise<string> {
  
  return fetch(`${Route_Server[0].url}${Route_Server[3].url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if(res.error_email){
        return res.error_email
      } else {
        return res;
      }
        
    })
    .catch((err) => {
      console.log(err);
      return "test";
    });
}
//
//
// LOGIN
//
//
export function login_user(formData: loginUser): Promise<boolean>{

  return fetch(`${Route_Server[0].url}${Route_Server[4].url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifiant: formData.identifiant,
      password: formData.mot_de_passe,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if(res.error_identifiant){
        setValid("connexion_mot_de_passe")
        setErreur("connexion_identifiant", res.error_identifiant)
        return false
      } else if(res.error_password){
        setValid("connexion_identifiant")
        setErreur("connexion_mot_de_passe", res.error_password)
        return false
      } else if(res.error_email){
        setValid("connexion_mot_de_passe")
        setErreur("connexion_identifiant", 
        (<>
        Vous devez confirmer votre email<br />
        <Typo
        balise="span"
        size="s5"
        color="c2"
        children="Renvoyer l'email" 
        fonction={Renvoie_email_modal}
        data_function={res.email}
        className="renvoyer_email"
        />
        </>))
        return false
      } else{
       localStorage.setItem("token_miam_miam", res);
       return true;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}
//
//
// RESET PASSWORD EMAIL
//
//
export function reset_password_email(email: string): Promise<boolean> {
  
  return fetch(`${Route_Server[0].url}${Route_Server[5].url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if(res.error_email){
        setErreur("reset_password_email_email", res.error_email)
        return false
      } else {
        setValid("reset_password_email_email")
        return true
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}
//
//
// RESET PASSWORD
//
//
export function reset_password(formData: loginUser, token?: string): Promise<boolean> {
  return fetch(`${Route_Server[0].url}${Route_Server[6].url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token :  token,
      password: formData.mot_de_passe,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if(res.error_token){
        setErreur("reste_password_mot_de_passe", res.error_token)
        return false
      } else if(res.error_password){
        setErreur("reste_password_mot_de_passe", res.error_password)
        return false
      } else{
        return true
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}