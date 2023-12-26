// TYPAGE
import { linksType, route, List_Icon, input, regex, modal_links, dropdown_data, api, dropdown_type, } from "#types/typages";
// ICONS
import { MdEmail, MdAlternateEmail, MdFamilyRestroom, MdOutlineTitle  } from "react-icons/md";
import { HiMiniUser } from "react-icons/hi2";
import { IoMdAddCircle } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
import { BiSolidUser, BiSolidLock, BiSolidLockOpen, BiLogoGoogle } from "react-icons/bi";
import { GiDualityMask, GiBodyHeight, GiSausage, GiWeight } from "react-icons/gi";
import { FaBirthdayCake, FaApple, FaFireAlt  } from "react-icons/fa";
import { PiGenderIntersex } from "react-icons/pi";
import { CiTextAlignCenter } from "react-icons/ci";
import { FaAngleUp } from "react-icons/fa6";
import { GiSteak } from "react-icons/gi";
import { LuWheat } from "react-icons/lu";
// BUILDER
import Button from "#components/build/global/button";
import Typo from "#components/build/global/typography";
import Input from "#components/build/global/input";
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
import Add_recipe from "#page/add_recipe";
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
    label: "paramètre",
    url: "/setting",
    type: "intern",
    page: <Setting/>,
  },
  {
    index: 5,
    label: "tableau de bord",
    url: "/dashbord",
    type: "intern",
    page: <Dashbord/>,
  },
  {
    index: 6,
    label: "profile",
    url: "/profil",
    type: "intern",
    page: <Profil/>,
  },
  {
    index: 7,
    label: "ajouter une recette",
    url: "/add_recipe",
    type: "intern",
    page: <Add_recipe/>,
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
  {
    index: 12,
    label: "repas/ingredient/ustensil/macro_micro/type",
    url: "/recipe/element_recipe",
    type: "intern",
  },
  {
    index: 13,
    label: "add ingredient",
    url: "/recipe/add_ingredient",
    type: "intern",
  },
  {
    index: 14,
    label: "add ustensil",
    url: "/recipe/add_ustensil",
    type: "intern",
  },
  {
    index: 15,
    label: "add recette",
    url: "/recipe/add_recipe",
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
    element_type_table: "type_ingredient_ustensil_repas",
    quantite: "quantite",
    etat_validation: "etat_validation",
    date_ajout: "date_ajout",
},
{
    table: "16_etape_preparation",
    id: "id",
    recette_id: "recette_id",
    type: "type_recette_edit_delet",
    contenu: "contenu",
    num_etape: "num_etape",
    date_ajout: "date_ajout",
},
{
    table: "17_consommation",
    id: "id",
    user_id: "user_id",
    recette_id: "recette_id",
    pourcentage: "pourcentage",
    etat_validation: "etat_validation",
    date_ajout: "date_ajout",
},
{
    table: "18_macro_micro",
    id: "id",
    name: "name",
    description: "description",
    abreviation: "abreviation",
    type: "type",
    icon: "icon",
    date_ajout: "date_ajout",
},
{
    table: "19_ingredient",
    id: "id",
    user_id: "user_id",
    name: "name",
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
    other_table_id: "macro_micro_type_id",
    type: "type_marco_micro_type",
    ingredient_id: "ingredient_id",
    quantite: "quantite",
    date_ajout: "date_ajout",
},
{
    table: "21_ustensil",
    id: "id",
    user_id: "user_id",
    name: "name",
    description: "description",
    abreviation: "abreviation",
    lien_affiliation: "lien_affiliation",
    marque: "marque",
    icon: "icon",
    date_ajout: "date_ajout",
    date_maj: "date_maj",
},
{
    table: "22_repas",
    id: "id",
    name: "name",
    description: "description",
    abreviation: "abreviation",
    icon: "icon",
    date_ajout: "date_ajout",
    date_maj: "date_maj",
},
{
    table: "23_type_produit",
    id: "id",
    name: "name",
    description: "description",
    abreviation: "abreviation",
    icon: "icon",
    date_ajout: "date_ajout",
    date_maj: "date_maj",
},
{
    table: "24_recettes_deletes",
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
    type: "chiffre et lettre et espace", 
    value: /^[a-zA-Z0-9 ]*$/,
   },
   {
    id: 14,
    type: "chiffre et lettre", 
    value: /^.{3,40}$/,
   },
   {
    id: 15,
    type: "chiffre et lettre", 
    value: /^[\s\S]{20,2000}$/,
   },
   {
    id: 16,
    type: "remplace espace et autre par undescore", 
    value: /[\s']/g,
   },
   {
    id: 17,
    type: "chiffre et lettre", 
    value: /^.{20,5000}$/,
   },
   {
    id: 18,
    type: "chiffre et lettre", 
    value: /^.{20,255}$/,
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
      key: 0,
      type: "user",
      icon: { icon: HiMiniUser },
    },
    {
      key: 1,
      type: "email",
      icon: { icon: MdEmail },
    },
    {
      key: 2,
      type: "croix",
      icon: { icon: IoCloseSharp },
    },
    {
      key: 3,
      type: "logo google",
      icon: { icon: BiLogoGoogle },
    },
    {
      key: 4,
      type: "croix",
      icon: { icon: GrClose },
    },
    {
      key: 5,
      type: "add",
      icon: {icon: IoMdAddCircle},
    }
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
export const Input_add_recipe: input[] = [
  {
    key: 0,
    variant: "t3",
    size: "s5",
    variable: Links_Server[12].name,
    type: "text",
    icon: {icon: MdOutlineTitle },
    text: "Nom de la Recette",
    value: "",
    element: "text",
    unitee: "",
  },
  {
    key: 1,
    variant: "t3",
    size: "s6",
    variable: Links_Server[12].description,
    type: "textarea",
    icon: {icon: CiTextAlignCenter},
    text: "Description",
    value: "",
    element: "textarea",
    unitee: "",
  },
  {
    key: 2,
    variant: "t3",
    size: "s6",
    variable: Links_Server[12].etape_preparation,
    type: "textarea",
    icon: {icon: CiTextAlignCenter},
    text: "Etape",
    value: "",
    element: "textarea",
    unitee: "",
  },
  {
    key: 3,
    variant: "t1",
    size: "s2",
    variable: "recette_presentation",
    type: "file",
    icon: {icon: GiSausage},
    text: "image de presentation",
    value: "",
    element: "img",
    unitee: "",
    multiples: false,
  },
  {
    key: 4,
    variant: "t2",
    size: "s2",
    variable: "recette_media",
    type: "file",
    icon: {icon: GiSausage},
    text: "image & video de recette",
    value: "",
    element: "img",
    unitee: "",
    multiples: true,
  },
]
//
export const Input_add_ingredient: input[] = [
  {
    key: 0,
    variant: "t3",
    size: "s2",
    variable: Links_Server[18].name,
    type: "text",
    icon: {icon: MdOutlineTitle },
    text: "Nom de l'ingredient",
    value: "",
    element: "text",
    unitee: "",
  },
  {
    key: 1,
    variant: "t3",
    size: "s2",
    variable: Links_Server[18].marque,
    type: "text",
    icon: {icon: FaApple},
    text: "Marque",
    value: "",
    element: "textarea",
    unitee: "",
  },
  {
    key: 2,
    variant: "t3",
    size: "s7",
    variable: Links_Server[18].description,
    type: "textarea",
    icon: {icon: CiTextAlignCenter},
    text: "Description",
    value: "",
    element: "textarea",
    unitee: "",
  },
  {
    key: 3,
    variant: "t3",
    size: "s1",
    variable:  Links_Server[18].calorie,
    type: "text",
    icon: {icon: FaFireAlt},
    text: "Calorie",
    value: "",
    element: "number",
    unitee: "g",
    multiples: false,
  },
  {
    key: 4,
    variant: "t3",
    size: "s1",
    variable: "proteine",
    type: "text",
    icon: {icon: GiSteak},
    text: "Proteine",
    value: "",
    element: "number",
    unitee: "g",
    multiples: true,
  },
  {
    key: 5,
    variant: "t3",
    size: "s1",
    variable: "glucide",
    type: "text",
    icon: {icon: LuWheat},
    text: "Glucide",
    value: "",
    element: "number",
    unitee: "g",
    multiples: true,
  },
  {
    key: 6,
    variant: "t3",
    size: "s1",
    variable: "lipide",
    type: "text",
    icon: {icon: GiSausage},
    text: "Lipide",
    value: "",
    element: "number",
    unitee: "g",
    multiples: true,
  },
  {
    key: 7,
    variant: "t1",
    size: "s2",
    variable: "ingredient_presentation",
    type: "file",
    icon: {icon: GiSausage},
    text: "image de presentation",
    value: "",
    element: "img",
    unitee: "",
    multiples: false,
  },
]
//
export const Input_add_ustensil: input[] = [
  {
    key: 0,
    variant: "t3",
    size: "s2",
    variable: Links_Server[20].name,
    type: "text",
    icon: {icon: MdOutlineTitle },
    text: "Nom de l'ustensil",
    value: "",
    element: "text",
    unitee: "",
  },
  {
    key: 1,
    variant: "t3",
    size: "s2",
    variable: Links_Server[20].marque,
    type: "text",
    icon: {icon: FaApple},
    text: "Marque",
    value: "",
    element: "textarea",
    unitee: "",
  },
  {
    key: 2,
    variant: "t3",
    size: "s7",
    variable: Links_Server[20].description,
    type: "textarea",
    icon: {icon: CiTextAlignCenter},
    text: "Description",
    value: "",
    element: "textarea",
    unitee: "",
  },
  {
    key: 3,
    variant: "t1",
    size: "s2",
    variable: "ustensil_presentation",
    type: "file",
    icon: {icon: GiSausage},
    text: "image de presentation",
    value: "",
    element: "img",
    unitee: "",
    multiples: false,
  },
]
//
//
// DROPDOWN
//
//
export const Dropdown_sexe : dropdown_data[] = [
  {
    name: "Homme",
  },
  {
    name: "Femme",
  },
]
//
export const Dropdown_time: dropdown_data[] = [
  { name: "1min" },
  { name: "2min" },
  { name: "3min" },
  { name: "4min" },
  { name: "5min" },
  { name: "6min" },
  { name: "7min" },
  { name: "8min" },
  { name: "9min" },
  { name: "10min" },
  { name: "15min" },
  { name: "20min" },
  { name: "25min" },
  { name: "30min" },
  { name: "35min" },
  { name: "40min" },
  { name: "45min" },
  { name: "50min" },
  { name: "55min" },
  { name: "60min" },
  { name: "70min" },
  { name: "80min" },
  { name: "90min" },
  { name: "100min" },
  { name: "110min" },
  { name: "120min" },
  { name: "130min" },
  { name: "140min" },
  { name: "150min" },
  { name: "160min" },
  { name: "170min" },
  { name: "180min" },
  { name: "190min" },
  { name: "200min" },
  { name: "210min" },
  { name: "220min" },
  { name: "230min" },
  { name: "240min" },
  { name: "250min" },
  { name: "260min" },
  { name: "270min" },
  { name: "280min" },
  { name: "290min" },
  { name: "300min" },
  { name: "310min" },
  { name: "320min" },
  { name: "330min" },
  { name: "340min" },
  { name: "350min" },
  { name: "360min" },
  { name: "370min" },
  { name: "380min" },
  { name: "390min" },
  { name: "400min" },
  { name: "410min" },
  { name: "420min" },
  { name: "430min" },
  { name: "440min" },
  { name: "450min" },
  { name: "460min" },
  { name: "470min" },
  { name: "480min" },
  { name: "490min" },
  { name: "500min" },
  { name: "510min" },
  { name: "520min" },
  { name: "530min" },
  { name: "540min" },
  { name: "550min" },
  { name: "560min" },
  { name: "570min" },
  { name: "580min" },
  { name: "590min" },
  { name: "600min" },
];
//
export const Dropdown_add_recipe : dropdown_type[] = [
  {
    key: 0,
    variant: "t3",
    variable: Links_Server[12].duree_recette,
    value: "Temps de Préparation",
    icon: {icon: FaAngleUp},
    list: Dropdown_time,
    search: false,
  },
  {
    key: 1,
    variant: "t1",
    variable: "ingredient",
    text: "Ingredients",
    icon: {icon: FaAngleUp},
    list: Dropdown_time,
    value: "Rechercher",
    search: true,
    number: true,
  },
  {
    key: 2,
    variant: "t1",
    variable: "repas",
    text: "Repas",
    icon: {icon: FaAngleUp},
    list: Dropdown_time,
    value: "Rechercher",
    search: true,
    number: false,
  },
  {
    key: 3,
    variant: "t1",
    variable: "ustensil",
    text: "Ustensils",
    icon: {icon: FaAngleUp},
    list: Dropdown_time,
    value: "Rechercher ustensil",
    search: true,
    number: true,
  },
]
//
export const Dropdown_add_ingredient : dropdown_type[] = [
  {
    key: 0,
    variant: "t1",
    variable: "type",
    text: "Type",
    icon: {icon: FaAngleUp},
    list: Dropdown_time,
    value: "Rechercher",
    search: true,
    number: false,
  },
  {
    key: 1,
    variant: "t1",
    variable: "vitamine_mineraux",
    text: "Vitamine & Mineraux",
    icon: {icon: FaAngleUp},
    list: Dropdown_time,
    value: "Rechercher",
    search: true,
    number: true,
  },
  {
    key: 2,
    variant: "t1",
    variable: "micronutriment",
    text: "Micronutirment",
    icon: {icon: FaAngleUp},
    list: Dropdown_time,
    value: "Rechercher",
    search: true,
    number: true,
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
    id: 7,
    name: "signalement",
    type: "t0",
    children:(<>
        <Typo
        balise="span"
        size="s6"
        color="cw"
        transform="maj"
        children="L'ingredient a bien était ajouté."
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
  {
    id: 8,
    name: "add_ingredient",
    type: "t0",
    children:(<>
 <Typo
        balise="span"
        size="s6"
        color="cw"
        transform="maj"
        children="L'ingredient a bien était ajouté."
        />           
        <Button 
        variant="t1"
        size="s5"
        fontSize="s4"
        children="ok"
        fonction={Close_modal}
        data_function={8}
             />       
            </>)
  },
]