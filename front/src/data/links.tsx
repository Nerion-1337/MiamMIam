// TYPAGE
import { linksType, route, List_Icon, inputConnexion, regex, modal_links } from "#types/typages";
// ICONS
import { MdEmail, MdAlternateEmail } from "react-icons/md";
import { HiMiniUser } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
import { BiSolidUser, BiSolidLock, BiSolidLockOpen, BiLogoGoogle } from "react-icons/bi";
// BUILDER
import Button from "#components/build/global/button";
import Typo from "#components/build/global/typography";
import Input from "#components/build/input";
//import Img from "#components/build/global/img";
//COMPONENTS
import { Close_modal, Reset_password_email_modal } from "#components/modal/modal_function";
// PAGE
import Error from "#page/error";
import Home from "#page/home";
import Confirm_email from "#page/confirm_email";
import Reset_password from "#page/reset_password";
//
//
//
export const Typelinks: Record<string, linksType> = {
  INTERN: "intern",
  EXTERN: "extern",
};
//
//
// ROUTES
//
//
export const Route_Client: route[] = [
  {
    index: 0,
    label: "home",
    url: "/",
    type: "intern",
    page: <Home/>,
  },
  {
    index: 1,
    label: "error",
    url: "*",
    type: "intern",
    page: <Error/>,
  },
  {
    index: 2,
    label: "Confirm_email",
    url: "/confirmation/:token",
    type: "intern",
    page: <Confirm_email/>,
  },
  {
    index: 3,
    label: "Reset_password",
    url: "/reset_password/:token",
    type: "intern",
    page: <Reset_password/>,
  },
  {
    index: 4,
    label: "user",
    url: "/profile",
    type: "intern",
  },
];
//
export const Route_Server: route[] = [
  {
    index: 0,
    label: "all",
    url: "http://localhost:5000/api",
    type: "intern",
  },
  {
    index: 1,
    label: "register",
    url: "/auth/register",
    type: "intern",
  },
  {
    index: 2,
    label: "confirm_email",
    url: "/auth/confirm_email",
    type: "intern",
  },
  {
    index: 3,
    label: "renvoie_email",
    url: "/auth/renvoie_email",
    type: "intern",
  },
  {
    index: 4,
    label: "login",
    url: "/auth/login",
    type: "intern",
  },
  {
    index: 5,
    label: "reset_password_email",
    url: "/auth/reset_password_email",
    type: "intern",
  },
  {
    index: 6,
    label: "reset_password",
    url: "/auth/reset_password",
    type: "intern",
  },
  {
    index: 7,
    label: "data_user",
    url: "/user/data_user",
    type: "intern",
  },
  {
    index: 8,
    label: "data_user",
    url: "/login",
    type: "intern",
  },
];
//
//
// REGEX
//
//
export const Regex: regex[] = [
  {
    id: 0,
   type: "name", 
   value: /[a-zA-ZÀ-ÿ -]+/,
  },
  {
    id: 1,
    type: "email nom", 
    value: /^[a-zA-ZÀ-ÿ0-9._%+-]+/,
   },
   {
    id: 2,
    type: "email @", 
    value: /@/,
   },
   {
    id: 3,
    type: "email nom domaine", 
    value: /@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
   },
   {
    id: 4,
    type: "limite même caractère qui ce suive à 2", 
    value: /(.)\1{2,}/,
   },
   {
    id: 5,
    type: "taille minimal et maximal 10-40", 
    value: /^.{10,40}$/,
   },
   {
    id: 6,
    type: "taille minimal et maximal 4-20", 
    value: /^[a-zA-ZÀ-ÿ -]{4,20}$/,
   },
   {
    id: 7,
    type: "chiffre ou nombre à 2 chiffres", 
    value: /^[0-9]{1,2}$/,
   },
   {
    id: 8,
    type: "date au format jj/mm/dddd", 
    value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
   },
   {
    id: 9,
    type: "date entre 1900 et 2015", 
    value: /^(19[0-9][0-9]|20[0-1][0-5])$/,
   },
   {
    id: 10,
    type:"2 lettre / chiffre et 1 maj",
    value: /^(?=(?:\D*\d){2})(?=[^A-Z]*[A-Z])/,
  },
]
//
//
// ICON
//
//
export const List_icon: List_Icon = {
  all: [
    {
      type: "user",
      icon: { icon: HiMiniUser },
    },
    {
      type: "email",
      icon: { icon: MdEmail },
    },
    {
      type: "croix",
      icon: { icon: IoCloseSharp },
    },
    {
      type: "logo google",
      icon: { icon: BiLogoGoogle },
    },
    {
      type: "croix",
      icon: { icon: GrClose },
    },
  ],
}
//
//
// INPUT
//
//
export const Input_connexion: inputConnexion[] = [
  {
    type: "text",
    icon: {icon: BiSolidUser},
    text: "Identifiant",
  },
  {
    type: "password",
    icon: {icon: BiSolidLock},
    text: "Mot de passe",
  },
]
//
export const Input_inscription: inputConnexion[] = [
  {
    type: "text",
    icon: {icon: BiSolidUser},
    text: "Identifiant",
  },
  {
    type: "password",
    icon: {icon: BiSolidLockOpen},
    text: "Mot de passe",
  },
  {
    type: "password",
    icon: {icon: BiSolidLock},
    text: "Confirmer mot de passe",
  },
  {
    type: "text",
    icon: {icon: MdAlternateEmail},
    text: "Email",
  },
]
//
//
// MODAL
//
//
export const Modals: modal_links[] = [
  {
    name: "inscription",
    type: "t0",
    children:(<>
        <Typo
        balise="span"
        size="s6"
        color="cw"
        transform="maj"
        children="Inscription Réussi"
        />
        <Typo
        balise="span"
        size="s5"
        color="c2"
        transform="maj"
        children="Un email pour activer votre compte vous a été envoyé."
        />  
          
        <Button 
        variant="t1"
        size="s5"
        fontSize="s4"
        children="ok"
        fonction={Close_modal}
        data_function={0} 
             />    
            </>)
  },
  {
    name: "renvoie_email",
    type: "t0",
    children:(<>
        <Typo
        balise="span"
        size="s6"
        color="cw"
        transform="maj"
        children="Email Envoyé !"
        />
        <Typo
        balise="span"
        size="s5"
        color="c2"
        transform="maj"
        children="Vérifier vos spam si nécessaire."
        />  
          
        <Button 
        variant="t1"
        size="s5"
        fontSize="s4"
        children="ok"
        fonction={Close_modal}
        data_function={1} 
             />    
            </>)
  },
  {
    name: "reset_password_email",
    type: "t0",
    children:(<>
        <Typo
        balise="span"
        size="s6"
        color="cw"
        transform="maj"
        children="Saisissez votre email ou pseudo."
        />
        <Typo
        balise="span"
        size="s5"
        color="c2"
        transform="maj"
        children="Un email sera envoyé pour changer votre mot de passe."
        /> 
        <Input
        type={Input_inscription[3].type}
        icon={Input_inscription[3].icon}
        text={Input_inscription[3].text}
        identifiant={`reset_password_email_${Input_inscription[3].text.replace(/\s/g, '_').toLowerCase()}`}
            />    
        <Button 
        variant="t3"
        size="s6"
        fontSize="s4"
        children="ENVOYER"
        fonction={Reset_password_email_modal}
        data_function={`reset_password_email_${Input_inscription[3].text.replace(/\s/g, '_').toLowerCase()}`} 
             />    
            </>)
  },
  {
    name: "reset_password",
    type: "t0",
    children:(<>
 <Typo
        balise="span"
        size="s6"
        color="cw"
        transform="maj"
        children="Mot de passe modifier"
        />
        <Typo
        balise="span"
        size="s5"
        color="c2"
        transform="maj"
        children="Vous pouvez vous connecter à présent avec votre new mdp."
        />  
          
        <Button 
        variant="t1"
        size="s5"
        fontSize="s4"
        children="ok"
        href={Route_Client[0].url}
        type={Route_Client[0].type}
        fonction={Close_modal}
        data_function={3}
             />       
            </>)
  },
]