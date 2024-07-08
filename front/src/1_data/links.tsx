// BUILDER
import Button from "#components/build/global/button";
import Typo from "#components/build/global/typography";
import Input from "#components/build/global/input";
//import Img from "#components/build/global/img";
//COMPONENTS
import { Close_modal, Reset_password_email_modal } from "#components/modal/modal_function";
// ICONS
import { BiSolidUser, BiSolidLock, BiSolidLockOpen, BiLogoGoogle } from "react-icons/bi";
import { CiTextAlignCenter } from "react-icons/ci";
import { FaBirthdayCake, FaApple, FaFireAlt, FaHeart, FaEllipsisH, FaChevronLeft, FaChevronRight, FaChevronDown, FaChevronUp, FaRegHeart, FaImage  } from "react-icons/fa";
import { FaAngleUp, FaPlus } from "react-icons/fa6";
import { GiDualityMask, GiBodyHeight, GiSausage, GiWeight, GiSteak } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { HiMiniUser, HiMiniEllipsisHorizontal  } from "react-icons/hi2";
import { IoMdAddCircle, IoMdSend  } from "react-icons/io";
import { IoCloseSharp, IoStarSharp, IoStarOutline, IoSearchOutline, IoAddCircleOutline} from "react-icons/io5";
import { LuWheat } from "react-icons/lu";
import { MdEmail, MdAlternateEmail, MdFamilyRestroom, MdOutlineTitle  } from "react-icons/md";
import { PiGenderIntersex, PiSmileyBold, PiArrowFatLeftFill  } from "react-icons/pi";
import { TbArrowBigLeftFilled } from "react-icons/tb"
// PAGE
import Error from "#page/error";
import Home from "#page/home";
import Confirm_email from "#page/confirm_email";
import Reset_password from "#page/reset_password";
import Setting from "#page/setting";
import Dashbord from "#page/dashbord";
import Profile from "#page/profile";
import Add_recipe from "#page/add_recipe";
import Recipe from "#page/recipe";
// TYPAGE
import { linksType, route, List_Icon, input, regex, modal_links, dropdown_data, api, dropdown_type, typo, button, calcule} from "#0_types/typages";
//
//
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
    label: "profile user",
    url: "/profile/:id",
    url_id: "/profile/",
    type: "intern",
    page: <Profile/>,
  },
  {
    index: 7,
    label: "ajouter une recette",
    url: "/add_recipe/:id",
    url_id: "/add_recipe/new",
    type: "intern",
    page: <Add_recipe/>,
  },
  {
    index: 8,
    label: "recette",
    url: "/recipe/:id",
    url_id: "/recipe/",
    type: "intern",
    page: <Recipe/>,
  },
  {
    index: 9,
    label: "profile user",
    url: "/profile/:id",
    url_id: "/profile/",
    type: "intern",
    page: <Profile/>,
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
    label: "my_data",
    url: "/user/my_data",
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
    label: "my_update",
    url: "/user/my_update",
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
  {
    index: 16,
    label: "get_recette",
    url: "/recipe/all_recipe",
    type: "intern",
  },
  {
    index: 17,
    label: "like & follow recipe",
    url: "/recipe/like_follow",
    type: "intern",
  },
  {
    index: 18,
    label: "data_user",
    url: "/user/data_user",
    type: "intern",
  },
  {
    index: 19,
    label: "follow_user",
    url: "/user/follow_user",
    type: "intern",
  },
  {
    index: 20,
    label: "verify follow and like recipe",
    url: "/recipe/verify_like_follow",
    type: "intern",
  },
  {
    index: 21,
    label: "verify follow and like user",
    url: "/user/verify_like_follow",
    type: "intern",
  },
  {
    index: 22,
    label: "récuper recette en fonction du token",
    url: "/recipe/all_recipe/user",
    type: "intern",
  },
  {
    index: 23,
    label: "récupère consommation user",
    url: "/consumption/user",
    type: "intern",
  },
  {
    index: 24,
    label: "récupère consommation user",
    url: "/consumption/add",
    type: "intern",
  },
  {
    index: 25,
    label: "récupère etapes preparation",
    url: "/recipe/cooking_process",
    type: "intern",
  },
  {
    index: 26,
    label: "récupère commentaire de recette",
    url: "/comment/recipe",
    type: "intern",
  },
  {
    index: 27,
    label: "like commentaire de recette",
    url: "/comment/like",
    type: "intern",
  },
  {
    index: 28,
    label: "verifie like commentaire de recette",
    url: "/comment/verify_like",
    type: "intern",
  },
  {
    index: 29,
    label: "ajouter commentaire",
    url: "/comment/add",
    type: "intern",
  },
  {
    index: 30,
    label: "all user",
    url: "/user/all_user",
    type: "intern",
  },
  {
    index: 31,
    label: "créer new conversation",
    url: "/tchat/new_conversation",
    type: "intern",
  },
  {
    index: 32,
    label: "all message",
    url: "/tchat/all_message",
    type: "intern",
  },
  {
    index: 33,
    label: "send message",
    url: "/tchat/add_message",
    type: "intern",
  },
  {
    index: 34,
    label: "voir toute les conversation user",
    url: "/tchat/get_conversation",
    type: "intern",
  },
  {
    index: 35,
    label: "modifier rangement conversation",
    url: "/tchat/update_option_conversation",
    type: "intern",
  },
  {
    index: 36,
    label: "modifier hidden conversation",
    url: "/tchat/hidden_conversation",
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
    etat_validation: "etat_validation",
    date_ajout: "date_ajout",
},
{
    table: "09_user_conversation",
    id: "id",
    user_id: "user_id",
    conversation_id: "conversation_id",
    option: "option_conversation",
    classification: "classification",
    date_ajout: "date_ajout",
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
  element_id_table: "type_id",
  element_type_table: "type_recipe_blog",
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
   {
    id: 19,
    type: "chiffre et lettre", 
    value: /^[\s\S]{2,2000}$/,
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
    },
    {
      key: 6,
      type: "trois petit point",
      icon: {icon: FaEllipsisH },
    },
    {
      key: 7,
      type: "signe +",
      icon: {icon: FaPlus},
    },
    {
      key: 8,
      type: "étoile",
      icon: {icon: IoStarSharp},
    },
    { 
      key: 9,
      type: "coeur",
      icon: {icon: FaHeart},
    },
    { 
      key: 10,
      type: "coeur vide",
      icon: {icon: FaRegHeart},
    },
    {  
      key: 11,
      type: "étoile vide",
      icon: {icon: IoStarOutline},
    },
    {  
      key: 12,
      type: "send",
      icon: {icon: IoMdSend},
    },
    {  
      key: 13,
      type: "image",
      icon: {icon: FaImage},
    },
    {  
      key: 14,
      type: "smiley",
      icon: {icon: PiSmileyBold },
    },
    { 
      key: 15,
      type: "plus et cercle",
      icon: {icon: IoAddCircleOutline },
    },
    { 
      key: 16,
      type: "arrow back",
      icon: {icon: TbArrowBigLeftFilled },
    },
  ],
  nutrition: [
    {
      key: 0,
      type: "calorie",
      icon: {icon: FaFireAlt},
    },
    {
      key: 1,
      type: "proteine",
      icon: {icon: GiSteak},
    },
    {
      key: 2,
      type: "glucide",
      icon: {icon: LuWheat},
    },
    {
      key: 3,
      type: "lipide",
      icon: {icon: GiSausage},
    },
  ],
  chevron: [
    {
      key: 0,
      type: "up",
      icon: {icon: FaChevronUp},
    },
    {
      key: 1,
      type: "down",
      icon: {icon: FaChevronDown},
    },
    {
      key: 2,
      type: "left",
      icon: {icon: FaChevronLeft},
    },
    {
      key: 3,
      type: "right",
      icon: {icon: FaChevronRight},
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
    variant: "t1",
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
    icon: List_icon.nutrition[0].icon,
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
    icon: List_icon.nutrition[1].icon,
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
    icon: List_icon.nutrition[2].icon,
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
    icon: List_icon.nutrition[3].icon,
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
export const Input_Research : input[] = [
  {
    key: 0,
    variant: "t1",
    size: "s2",
    variable: "research",
    type: "text",
    icon: {icon: IoSearchOutline  },
    text: "Rechercher une recette, ingredient...",
    value: "",
    element: "search",
    unitee: "",
    special: "global",
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
]
//
export const Input_range_recipe : input[] = [
  {
    key: 0,
    variant: "t1",
    size: "s2",
    variable: "",
    type: "text",
    icon: {icon: IoSearchOutline  },
    text: "range",
    value: "100",
    element: "range",
    unitee: "",
    special: "",
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
]
//
export const Input_recipe_add_comment : input[] = [
  {
    key: 0,
    variant: "t2",
    size: "s3",
    variable: Links_Server[10].contenu,
    type: "textarea",
    icon: {icon: MdOutlineTitle },
    text: "",
    value: "",
    element: "textarea",
    unitee: "",
    special:"height_auto"
  },
]
//
export const Input_add_conversation: input[] = [
  {
    key: 0,
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
]
//
export const Input_Research_all_user : input[] = [
  {
    key: 0,
    variant: "t1",
    size: "s2",
    variable: "research",
    type: "text",
    icon: {icon: IoSearchOutline  },
    text: "Rechercher un utilisateur",
    value: "",
    element: "search",
    unitee: "",
    special: "global",
  },
]
//
export const Input_add_message: input[] = [
  {
    key: 0,
    variant: "t2",
    size: "s3",
    variable: Links_Server[9].contenu,
    type: "textarea",
    icon: {icon: MdOutlineTitle },
    text: "",
    value: "",
    element: "textarea",
    unitee: "",
    special:"height_auto"
  },
]
//
//
// LIST
//
//
export const List_sexe : dropdown_data[] = [
  {
    name: "Homme",
  },
  {
    name: "Femme",
  },
]
//
export const List_time: dropdown_data[] = [];
for (let i = 0; i <= 600; i += (i <= 9 ? 1 : i <= 55 ? 5 : 10)) {
  List_time.push({ name: `${i}min` });
}
//
export const List_calorie: dropdown_data[] = [];
for (let i = 0; i <= 19000; i += (i <= 900 ? 100 : i <= 9500 ? 500 : 1000)) {
  List_calorie.push({ name: `${i}-${i + (i <= 900 ? 100 : i <= 9500 ? 500 : 1000)} cal` });
}
//
export const List_nutriScore: dropdown_data[] = []
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
letters.forEach((letter) => {
        List_nutriScore.push({ name: `${letter}+` });
        List_nutriScore.push({ name: letter });
        List_nutriScore.push({ name: `${letter}-` });
});
//
export const List_trier: dropdown_data[] = [
  {
    name: "Nom",
    back: `${Links_Server[12].name}`
  },
  {
    name: "Like",
    back: `${Links_Server[12].like_total}`
  },  
  {
    name: "Date",
    back: `${Links_Server[12].date_ajout}`
  },
  {
    name: "Nutri Score",
    back: `${Links_Server[12].nutri_score}`
  },
  {
    name: "Durée",
    back: `${Links_Server[12].duree_recette}`
  },
  {
    name: "Calorie",
    back: `${Links_Server[12].calorie}`
  },
]
//
export const List_option_profil: dropdown_data[] = [
  {
    name: "signalement",
  },
]
//
export const List_option_recipe: dropdown_data[] = [
  {
    name: "signalement",
  },  
  {
    name: "consommer",
  },
]
//
export const List_option_dashbord: dropdown_data[] = [
  {
    name: "mes recettes",
    back: "my_recipe"
  },
  {
    name: "mes favories",
    back:"my_favori_recipe"
  },
  {
    name: "mes consos",
    back:"my_consumption"
  },
]
//
export const List_option_objectif: dropdown_data[] = [
  {
    name: "objectif / j",
    back: "day",
  },
  {
    name: "objectif / s",
    back: "week",
  },
  {
    name: "objectif / m",
    back: "month",
  },
]
//
export const List_option_realization: dropdown_data[] = [
  {
    name: "realisation / j",
    back: "holyday"
  },
  {
    name: "realisation / s",
    back:"week"
  },
  {
    name: "realisation / m",
    back:"month"
  },
]
//
export const List_macro_objectif: calcule[] = [
  {
    key: 0,
    calorie: 0.91,
    proteine: 0.2 / 4,
    glucide: 0.45 / 4 * 0.8,
    lipide: 0.35 / 9,
  },
  {
    key: 1,
    calorie: 1,
    proteine: 0.2 / 4,
    glucide: 0.45 / 4,
    lipide: 0.35 / 9,
  },
  {
    key: 2,
    calorie: 1.1,
    proteine: 0.2 / 4 * 1.1,
    glucide: 0.45 / 4 * 1.1,
    lipide: 0.35 / 9 * 1.1,
  },
]
//
export const List_option_distribution_recipe: dropdown_data[] = [
  {
    name: "pour 100g",
  },  
  {
    name: "total recette",
  },
]
//
export const List_option_comment: dropdown_data[] = [
  {
    name: "signalement",
  },
]
//
export const List_type_tchat: dropdown_data[] = [
  {
    name: "principal",
  },
  {
    name: "tout",
  },
  {
    name: "invitation",
  },
]
//
//
// DROPDOWN
//
//
export const Dropdown_add_recipe : dropdown_type[] = [
  {
    key: 0,
    variant: "t3",
    variable: Links_Server[12].duree_recette,
    value: "Temps de Préparation",
    icon: {icon: FaAngleUp},
    list: List_time,
    search: false,
  },
  {
    key: 1,
    variant: "t1",
    variable: "ingredient",
    text: "Ingredients",
    icon: {icon: FaAngleUp},
    list: List_time,
    placeholder: "Rechercher",
    search: true,
    number: true,
  },
  {
    key: 2,
    variant: "t1",
    variable: "repas",
    text: "Repas",
    icon: {icon: FaAngleUp},
    list: List_time,
    placeholder: "Rechercher",
    search: true,
    number: false,
  },
  {
    key: 3,
    variant: "t1",
    variable: "ustensil",
    text: "Ustensils",
    icon: {icon: FaAngleUp},
    list: List_time,
    placeholder: "Rechercher ustensil",
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
    list: List_time,
    placeholder: "Rechercher",
    search: true,
    number: false,
  },
  {
    key: 1,
    variant: "t1",
    variable: "vitamine_mineraux",
    text: "Vitamine & Mineraux",
    icon: {icon: FaAngleUp},
    list: List_time,
    placeholder: "Rechercher",
    search: true,
    number: true,
  },
  {
    key: 2,
    variant: "t1",
    variable: "micronutriment",
    text: "Micronutirment",
    icon: {icon: FaAngleUp},
    list: List_time,
    placeholder: "Rechercher",
    search: true,
    number: true,
  },
]
//
export const Dropdown_research : dropdown_type[] = [
  {
    key: 0,
    variant: "t5",
    variable: "trier",
    text: "Trier",
    icon: {icon: FaAngleUp  },
    list: List_time,
    value: "Trier",
    search: false,
    number: false,
  },
  {
    key: 1,
    variant: "t4",
    variable: "nutri_score",
    text: "Nutri-Score",
    icon: {icon: FaAngleUp},
    list: List_time,
    placeholder: "Rechercher",
    search: true,
    number: true,
  },
  {
    key: 2,
    variant: "t4",
    variable: "duree_recette",
    text: "Durée",
    icon: {icon: FaAngleUp},
    list: List_time,
    placeholder: "Rechercher",
    search: true,
    number: true,
  },
  {
    key: 3,
    variant: "t4",
    variable: "calorie",
    text: "Calorie",
    icon: {icon: FaAngleUp},
    list: List_time,
    placeholder: "Rechercher",
    search: true,
    number: true,
  },
  {
    key: 4,
    variant: "t4",
    variable: "repas",
    text: "Repas",
    icon: {icon: FaAngleUp},
    list: List_time,
    placeholder: "Rechercher",
    search: true,
    number: true,
  },
  {
    key: 5,
    variant: "t4",
    variable: "chef",
    text: "Chef",
    icon: {icon: FaAngleUp},
    list: List_time,
    placeholder: "Rechercher",
    search: true,
    number: true,
  },
]
//
export const Dropdown_research_profile : dropdown_type[] = [
  {
    key: 0,
    variant: "t6",
    variable: "trier",
    text: "Trier",
    icon: {icon: FaAngleUp},
    list: List_time,
    value: "Trier",
    search: false,
    number: false,
  },
  {
    key: 1,
    variant: "t1",
    variable: "nutri_score",
    text: "Nutri-Score",
    icon: {icon: FaAngleUp},
    list: List_time,
    placeholder: "Rechercher",
    search: true,
    number: true,
  },
  {
    key: 2,
    variant: "t1",
    variable: "duree_recette",
    text: "Durée",
    icon: {icon: FaAngleUp},
    list: List_time,
    placeholder: "Rechercher",
    search: true,
    number: true,
  },
  {
    key: 3,
    variant: "t1",
    variable: "calorie",
    text: "Calorie",
    icon: {icon: FaAngleUp},
    list: List_time,
    placeholder: "Rechercher",
    search: true,
    number: true,
  },
  {
    key: 4,
    variant: "t1",
    variable: "repas",
    text: "Repas",
    icon: {icon: FaAngleUp},
    list: List_time,
    placeholder: "Rechercher",
    search: true,
    number: true,
  },
  {
    key: 5,
    variant: "t1",
    variable: "chef",
    text: "Chef",
    icon: {icon: FaAngleUp},
    list: List_time,
    placeholder: "Rechercher",
    search: true,
    number: true,
  },
]
//
export const Dropdown_option_profile : dropdown_type[] = [
  {
    key: 0,
    variant: "t7",
    variable: "",
    text: "",
    icon: {icon: FaEllipsisH},
    list: List_option_profil,
    value: "",
    search: false,
    number: false,
    filter: false,
    modale: true,
  },
]
//
export const Dropdown_option_card_recipe : dropdown_type[] = [
  {
    key: 0,
    variant: "t8",
    variable: "",
    text: "",
    icon: {icon: FaEllipsisH},
    list: List_option_recipe,
    value: "",
    search: false,
    number: false,
    filter: false,
    modale: true,
  },
]
//
export const Dropdown_option_dashbord : dropdown_type[] = [
  {
    key: 0,
    variant: "t9",
    variable: "option_dashbord",
    text: "mes recettes",
    icon: {icon: FaAngleUp},
    list: List_option_dashbord,
    value: "mes recettes",
    search: false,
    number: false,
    filter: false,
    modale: false,
  },
  {
    key: 1,
    variant: "t9",
    variable: "option_dashbord",
    text: "objectif / j",
    icon: {icon: FaAngleUp},
    list: List_option_objectif,
    value: "objectif / j",
    search: false,
    number: false,
    filter: false,
    modale: false,
  },
  {
    key: 2,
    variant: "t9",
    variable: "option_dashbord",
    text: "realisation / j",
    icon: {icon: FaAngleUp},
    list: List_option_realization,
    value: "realisation / j",
    search: false,
    number: false,
    filter: false,
    modale: false,
  },
]
//
export const Dropdown_option_recipe : dropdown_type[] = [
  {
    key: 0,
    variant: "t10",
    variable: "option_dashbord",
    text: "total recette",
    icon: {icon: FaAngleUp},
    list: List_option_distribution_recipe,
    value: "total recette",
    search: false,
    number: false,
    filter: false,
    modale: false,
  },
  {
    key: 1,
    variant: "t10",
    variable: "option_dashbord",
    text: "objectif / j",
    icon: {icon: FaAngleUp},
    list: List_option_objectif,
    value: "objectif / j",
    search: false,
    number: false,
    filter: false,
    modale: false,
  },
  {
    key: 0,
    variant: "t9",
    variable: "option_dashbord",
    text: "realisation / j",
    icon: {icon: FaAngleUp},
    list: List_option_realization,
    value: "realisation / j",
    search: false,
    number: false,
    filter: false,
    modale: false,
  },
]
//
export const Dropdown_option_comment : dropdown_type[] = [
  {
    key: 0,
    variant: "t8",
    variable: "",
    text: "",
    icon: {icon: FaEllipsisH},
    list: List_option_comment,
    value: "",
    search: false,
    number: false,
    filter: false,
    modale: true,
  },
]
//
export const Dropdown_option_type_tchat : dropdown_type[] = [
  {
    key: 0,
    variant: "t11",
    variable: "option",
    text: "tout",
    icon: {icon: FaAngleUp},
    list: List_type_tchat,
    value: "tout",
    search: false,
    number: false,
    filter: false,
    modale: false,
  },
  {
    key: 1,
    variant: "t9",
    variable: "option_dashbord",
    text: "objectif / j",
    icon: {icon: FaAngleUp},
    list: List_option_objectif,
    value: "objectif / j",
    search: false,
    number: false,
    filter: false,
    modale: false,
  },
  {
    key: 2,
    variant: "t9",
    variable: "option_dashbord",
    text: "realisation / j",
    icon: {icon: FaAngleUp},
    list: List_option_realization,
    value: "realisation / j",
    search: false,
    number: false,
    filter: false,
    modale: false,
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
        variant={Input_inscription[0].variant}
        element={Input_inscription[0].element}
        type={Input_inscription[0].type}
        icon={Input_inscription[0].icon}
        text={Input_inscription[0].text}
        variable={Input_inscription[0].variable}
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
//
//
// TYPO
//
//
export const typo_calorie: typo[] = [
  {
    key: 0,
    balise: "span",
    size: "s5",
    familly: "f1",
    weight: "w4",
    transform: "cap",
    color: "c3",
    icon: List_icon.nutrition[0].icon,
    LR: "left",
    children:"calorie:"
  },
  {
    key: 1,
    balise: "span",
    size: "s5",
    familly: "f1",
    weight: "w4",
    transform: "cap",
    color: "c3",
    icon: List_icon.nutrition[1].icon,
    LR: "left",
    children:"protéine:"
  },
  {
    key: 2,
    balise: "span",
    size: "s5",
    familly: "f1",
    weight: "w4",
    transform: "cap",
    color: "c3",
    icon: List_icon.nutrition[2].icon,
    LR: "left",
    children:"glucide:"
  },
  {
    key: 3,
    balise: "span",
    size: "s5",
    familly: "f1",
    weight: "w4",
    transform: "cap",
    color: "c3",
    icon: List_icon.nutrition[3].icon,
    LR: "left",
    children:"lipide:"
  },
]
//
//
// BUTTON
//
//
export const button_objectif: button[] = [
  {
    key: 0,
    variant: "t3",
    fontSize: "s2",
    children: "perte de poids",
    children_actif:"perte de poids",
    href: "{Route_Client[0].url}",
    type: "{Route_Client[0].type}",
    active_href: "",

  },
  {
    key: 1,
    variant: "t3",
    fontSize: "s2",
    children: "maintient",
    children_actif:"maintient",
    href: "{Route_Client[0].url}",
    type: "{Route_Client[0].type}",
    active_href: "",
  },
  {
    key: 2,
    variant: "t3",
    fontSize: "s2",
    children: "prise de masse",
    children_actif:"prise de masse",
    href: "{Route_Client[0].url}",
    type: "{Route_Client[0].type}",
    active_href: "",
  },
]
//