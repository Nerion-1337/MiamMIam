// TYPAGE
import { linksType, route, List_Icon, input, regex, modal_links, dropdown, api } from "#types/typages";
// ICONS
import { MdEmail, MdAlternateEmail, MdFamilyRestroom, MdOutlineTitle  } from "react-icons/md";
import { HiMiniUser } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
import { BiSolidUser, BiSolidLock, BiSolidLockOpen, BiLogoGoogle } from "react-icons/bi";
import { GiDualityMask, GiBodyHeight, GiSausage, GiWeight } from "react-icons/gi";
import { FaBirthdayCake } from "react-icons/fa";
import { PiGenderIntersex } from "react-icons/pi";
import { CiTextAlignCenter } from "react-icons/ci";
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
import Setting from "#page/setting";
import Dashbord from "#page/dashbord";
import Profil from "#page/profil";
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
    url: "/setting",
    type: "intern",
    page: <Setting/>,
  },
  {
    index: 5,
    label: "user",
    url: "/dashbord",
    type: "intern",
    page: <Dashbord/>,
  },
  {
    index: 6,
    label: "user",
    url: "/profil",
    type: "intern",
    page: <Profil/>,
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
    label: "login_google",
    url: "/google",
    type: "intern",
  },  
  {
    index: 9,
    label: "update_user",
    url: "/user/update_user",
    type: "intern",
  },
  {
    index: 10,
    label: "signalement setting",
    url: "/signalement/sitting",
    type: "intern",
  },
  {
    index: 11,
    label: "token actif",
    url: "/token",
    type: "intern",
  },
];
//
export const Route_Assets: route[] = [
  {
    index: 0,
    label: "img global stockage",
    url: "http://localhost:5000/assets",
    type: "intern",
  },
  {
    index: 1,
    label: "img user",
    url: "/user/",
    type: "intern",
  },
  {
    index: 2,
    label: "img user",
    url: "/recette/",
    type: "intern",
  },
  {
    index: 3,
    label: "img user",
    url: "/commentaire/",
    type: "intern",
  },
  {
    index: 4,
    label: "img user",
    url: "/ingredient/",
    type: "intern",
  },
  {
    index: 5,
    label: "img user",
    url: "/ustensil/",
    type: "intern",
  },
  {
    index: 6,
    label: "img user",
    url: "/message/",
    type: "intern",
  },
  {
    index: 7,
    label: "img user",
    url: "/signalement/",
    type: "intern",
  },
];
//
//
// LINKS SERVEURS
//
//
export const Links_Server: api[] = [
  {
      table: "01_utilisateur",
      id: "id",
      pseudo: "pseudo",
      email: "email",
      valid: "confirm_email",
      password: "password",
      check: "code_check",
      first_name: "first_name",
      last_name: "last_name",
      photo_profil: "photo_profil",
      sexe: "sexe",
      age: "age",
      taille: "taille",
      poids: "poids",
      masse_grasse: "masse_grasse",
      titre: "titre",
      objectif: "objectif",
      follower_total: "follower_total",
      note_modo: "note_modo",
      date_ajout: "date_ajout",
      date_maj: "date_maj",
  },
  {
      table: "02_adresse_ip",
      id: "id",
      user_id: "user_id",
      adresse_ip: "adresse_ip",
      date_ajout: "date_ajout",
  },
  {
      table: "03_user_lock",
      id: "id",
      user_id: "user_id",
      user_id_lock: "user_id_lock",
      date_ajout: "date_ajout",
  },
  {
      table: "04_media",
      id: "id",
      adress: "adress",
      element_id_table: "user_recette_commentaire_alimentation_message_signalement_id",
      element_type_table: "type_user_recette_commentaire_alimentation_message_signalement",
      etat_validation: "etat_validation",
      date_ajout: "date_ajout",
  },
  {
      table: "05_signalement",
      id: "id",
      user_id: "user_id",
      sujet: "sujet",
      contenu: "contenu",
      element_id_table: "user_recette_commentaire_alimentation_message_signalement_id",
      note_modo: "note_modo",
      etat_validation: "etat_validation",
      date_ajout: "date_ajout",
      date_resolution: "date_resolution",
  },
  {
      table: "06_follow",
      id: "id",
      user_id: "user_id",
      element_id_table: "recette_user_id",
      element_type_table: "type_recette_user",
      date_ajout: "date_ajout",
  },
  {
      table: "07_likes",
      id: "id",
      user_id: "user_id",
      element_id_table: "recette_commentaire_id",
      element_type_table: "type_recette_commentaire",
      user_id_post: "user_id_post",
      date_ajout: "date_ajout",
  },
  {
      table: "08_conversation",
      id: "id",
      user_id: "user_id",
      conversation_id: "conversation_id",
      etat_validation: "etat_validation",
      date_ajout: "date_ajout",
  },
  {
      table: "09_classification_conversation",
      id: "id",
      user_id: "user_id",
      conversation_id: "conversation_id",
      type: "type",
  },
  {
      table: "10_messages",
      id: "id",
      user_id: "user_id",
      conversation_id: "conversation_id",
      contenu: "contenu",
      etat_validation: "etat_validation",
      date_ajout: "date_ajout",
  },
  {
      table: "11_commentaire",
      id: "id",
      user_id: "user_id",
      contenu: "contenu",
      like_total: "like_total",
      recette_id: "recette_id",
      etat_validation: "etat_validation",
      date_ajout: "date_ajout",
      date_maj: "date_maj",
  },
  {
      table: "12_commentaire_edit",
      id: "id",
      commentaire_id: "commentaire_id",
      contenu: "contenu",
      etat_validation: "etat_validation",
      date_ajout: "date_ajout",
  },
  {
      table: "13_recettes",
      id: "id",
      user_id: "user_id",
      name: "name",
      description: "description",
      etape_preparation: "etape_preparation",
      nutri_score: "nutri_score",
      calorie: "calorie",
      duree_recette: "duree_recette",
      like_total: "like_total",
      follower_total: "follower_total",
      etat_validation: "etat_validation",
      date_ajout: "date_ajout",
      date_maj: "date_maj",
  },
  {
      table: "14_recettes_edit",
      id: "id",
      name: "name",
      description: "description",
      etape_preparation: "etape_preparation",
      nutri_score: "nutri_score",
      calorie: "calorie",
      duree_recette: "duree_recette",
      etat_validation: "etat_validation",
      date_ajout: "date_ajout",
  },
  {
      table: "15_contenu_recette",
      id: "id",
      recette_id: "recette_id",
      type: "type_recette_edit_delet",
      element_id_table: "ingredient_ustensil_id",
      element_type_table: "type_ingredient_ustensil",
      quantite: "quantite",
      type_all: "type_all",
      etat_validation: "etat_validation",
      date_ajout: "date_ajout",
  },
  {
      table: "16_consommation",
      id: "id",
      user_id: "user_id",
      recette_id: "recette_id",
      pourcentage: "pourcentage",
      etat_validation: "etat_validation",
      date_ajout: "date_ajout",
  },
  {
      table: "17_macro_micro",
      id: "id",
      nom: "nom",
      description: "description",
      abreviation: "abreviation",
      icon: "icon",
      date_ajout: "date_ajout",
  },
  {
      table: "18_ustensil",
      id: "id",
      nom: "nom",
      description: "description",
      abreviation: "abreviation",
      lien_affiliation: "lien_affiliation",
      marque: "marque",
      icon: "icon",
      date_ajout: "date_ajout",
      date_maj: "date_maj",
  },
  {
      table: "19_ingredient",
      id: "id",
      nom: "nom",
      description: "description",
      abreviation: "abreviation",
      calorie: "calorie",
      lien_affiliation: "lien_affiliation",
      marque: "marque",
      icon: "icon",
      date_ajout: "date_ajout",
      date_maj: "date_maj",
  },
  {
      table: "20_contenu_ingredient",
      id: "id",
      macro_micro_id: "macro_micro_id",
      ingredient_id: "ingredient_id",
      quantite: "quantite",
      date_ajout: "date_ajout",
  },
  {
      table: "21_recettes_deletes",
      id: "id",
      recette_id: "recette_id",
      user_id: "user_id",
      name: "name",
      description: "description",
      etape_preparation: "etape_preparation",
      nutri_score: "nutri_score",
      calorie: "calorie",
      duree_recette: "duree_recette",
      like_total: "like_total",
      follower_total: "follower_total",
      etat_validation: "etat_validation",
      date_ajout: "date_ajout",
      date_maj: "date_maj",
  },
]
//
//
// REGEX
//
//
export const Regex: regex[] = [
  {
   id: 0,
   type: "contient que des lettres", 
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
  {
    id: 11,
    type: "taille minimal et maximal 4-20", 
    value: /^[a-zA-ZÀ-ÿ -]{2,20}$/,
   },
   {
    id: 12,
    type: "chiffre ou nombre 2 à 3 chiffres", 
    value: /^[0-9]{2,3}$/,
   },
   {
    id: 13,
    type: "chiffre et lettre", 
    value: /^[a-zA-Z0-9 ]*$/,
   },
   {
    id: 14,
    type: "chiffre et lettre", 
    value: /^.{4,40}$/,
   },
   {
    id: 15,
    type: "chiffre et lettre", 
    value: /^.{20,1000}$/,
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
export const Input_connexion: input[] = [
  {
    type: "text",
    variant: "t1",
    variable: Links_Server[0].pseudo,
    icon: {icon: BiSolidUser},
    text: "Identifiant",
    value: "",
    element: "text",
    unitee: ""
  },
  {
    variant: "t1",
    variable: Links_Server[0].password,
    type: "password",
    icon: {icon: BiSolidLock},
    text: "Mot de passe",
    value: "",
    element: "text",
    unitee: ""
  },
]
//
export const Input_inscription: input[] = [
  {
    variant: "t1",
    variable: Links_Server[0].pseudo,
    type: "text",
    icon: {icon: BiSolidUser},
    text: "Identifiant",
    value: "",
    element: "text",
    unitee: ""
  },
  {
    variant: "t1",
    variable: Links_Server[0].password,
    type: "password",
    icon: {icon: BiSolidLockOpen},
    text: "Mot de passe",
    value: "",
    element: "text",
    unitee: ""
  },
  {
    variant: "t1",
    variable: "password_valid",
    type: "password",
    icon: {icon: BiSolidLock},
    text: "Confirmer mot de passe",
    value: "",
    element: "text",
    unitee: "",
  },
  {
    variant: "t1",
    variable: Links_Server[0].email,
    type: "text",
    icon: {icon: MdAlternateEmail},
    text: "Email",
    value: "",
    element: "text",
    unitee: "",
  },
]
//
export const Input_setting: input[] = [
  {
    key: 0,
    variant: "t2",
    variable: Links_Server[0].pseudo,
    type: "text",
    icon: {icon: GiDualityMask},
    text: "Identifiant",
    value: "pseudo",
    element: "text",
    unitee: "",
  },
  {
    key: 1,
    variant: "t2",
    variable: Links_Server[0].email,
    type: "text",
    icon: {icon: MdAlternateEmail},
    text: "Email",
    value: "email",
    element: "text",
    unitee: "",
  },  
  {
    key: 2,
    variant: "t2",
    variable: Links_Server[0].password,
    type: "password",
    icon: {icon: BiSolidLockOpen},
    text: "Mot de passe",
    value: "",
    element: "text",
    unitee: "",
  },
  {
    key: 3,
    variant: "t2",
    variable: "password_valid",
    type: "password",
    icon: {icon: BiSolidLock},
    text: "Confirmer mot de passe",
    value: "",
    element: "text",
    unitee: "",
  },
  {
    key: 4,
    variant: "t2",
    variable: Links_Server[0].first_name,
    type: "text",
    icon: {icon: MdFamilyRestroom},
    text: "Nom",
    value: "first_name",
    element: "text",
    unitee: "",
  },
  {
    key: 5,
    variant: "t2",
    variable: Links_Server[0].last_name,
    type: "text",
    icon: {icon: BiSolidUser},
    text: "Prénom",
    value: "last_name",
    element: "text",
    unitee: "",
  },
  {
    key: 6,
    variant: "t2",
    variable: Links_Server[0].sexe,
    type: "dropdown",
    icon: {icon: PiGenderIntersex},
    text: "Sexe",
    value: "sexe",
    element: "text",
    unitee: "",
  },
  {
    key: 7,
    variant: "t2",
    variable: Links_Server[0].age,
    type: "text",
    icon: {icon: FaBirthdayCake},
    text: "Date de naissance",
    value: "age",
    element: "date",
    unitee: "",
  },
  {
    key: 8,
    variant: "t2",
    variable: Links_Server[0].taille,
    type: "text",
    icon: {icon: GiBodyHeight},
    text: "Taille",
    value: "taille",
    element: "number",
    unitee: "cm",
  },
  {
    key: 9,
    variant: "t2",
    variable: Links_Server[0].poids,
    type: "text",
    icon: {icon: GiWeight},
    text: "Poids",
    value: "poids",
    element: "number",
    unitee: "kg",
  },
  {
    key: 10,
    variant: "t2",
    variable: Links_Server[0].masse_grasse,
    type: "text",
    icon: {icon: GiSausage},
    text: "Masse Grasse",
    value: "masse_grasse",
    element: "number",
    unitee: "%",
  },
  {
    key: 11,
    variant: "t1",
    variable: Links_Server[0].photo_profil,
    type: "file",
    icon: {icon: GiSausage},
    text: "selectionner",
    value: "photo_profil",
    element: "img",
    unitee: "",
  },
]
//
export const Input_setting_signalement: input[] = [
  {
    key: 0,
    variant: "t3",
    size: "s3",
    variable: Links_Server[4].sujet,
    type: "text",
    icon: {icon: MdOutlineTitle },
    text: "Sujet",
    value: "",
    element: "text",
    unitee: "",
  },
  {
    key: 1,
    variant: "t3",
    size: "s4",
    variable: Links_Server[4].contenu,
    type: "textarea",
    icon: {icon: CiTextAlignCenter},
    text: "Contenu",
    value: "",
    element: "textarea",
    unitee: "",
  },  
  {
    key: 2,
    variant: "t2",
    size: "s3",
    variable: "signalement",
    type: "file",
    icon: {icon: GiSausage},
    text: "selectionner des images",
    value: "",
    element: "img",
    unitee: "",
    multiples: true,
  },
]
//
//
// DROPDOWN
//
//
export const Dropdown_sexe : dropdown[] = [
  {
    name: "Homme",
  },
  {
    name: "Femme",
  },
]
//
//
// MODAL
//
//
export const Modals: modal_links[] = [
  {
    id: 0,
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
    id: 1,
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
    id: 2,
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
        element={Input_inscription[3].element}
        type={Input_inscription[3].type}
        icon={Input_inscription[3].icon}
        text={Input_inscription[3].text}
        variable={Input_inscription[3].variable}
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
    id: 3,
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
  {
    id: 4,
    name: "update_user_setting",
    type: "t0",
    children:(<>
 <Typo
        balise="span"
        size="s6"
        color="cw"
        transform="maj"
        children="Les données ont bien étaient modifiers !"
        />         
        <Button 
        variant="t1"
        size="s5"
        fontSize="s4"
        children="ok"
        fonction={Close_modal}
        data_function={4}
             />       
            </>)
  },
  {
    id: 5,
    name: "update_user_setting",
    type: "t0",
    children:(<>
 <Typo
        balise="span"
        size="s6"
        color="cw"
        transform="maj"
        children="Aucune données n'a été modifié."
        />         
        <Button 
        variant="t1"
        size="s5"
        fontSize="s4"
        children="ok"
        fonction={Close_modal}
        data_function={5}
             />       
            </>)
  },
  {
    id: 6,
    name: "signalement",
    type: "t0",
    children:(<>
 <Typo
        balise="span"
        size="s6"
        color="cw"
        transform="maj"
        children="Le signalement à bien été prit en compte."
        />           
        <Button 
        variant="t1"
        size="s5"
        fontSize="s4"
        children="ok"
        fonction={Close_modal}
        data_function={6}
             />       
            </>)
  },
  {
    id: 6,
    name: "signalement",
    type: "t0",
    children:(<>
 <Typo
        balise="span"
        size="s6"
        color="cw"
        transform="maj"
        children="Vous avez déjà soumis trop de signalement non traité."
        />  
         <Typo
        balise="span"
        size="s6"
        color="c2"
        transform="maj"
        children="Il vous faudra attendre que certain soient cloturés avant de pouvoir en postuler de nouveau."
        />           
        <Button 
        variant="t1"
        size="s5"
        fontSize="s4"
        children="ok"
        fonction={Close_modal}
        data_function={7}
             />       
            </>)
  },
]