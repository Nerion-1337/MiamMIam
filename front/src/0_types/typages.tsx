import { IconType } from "react-icons";
// REACT
import { Dispatch, SetStateAction } from 'react';
//
// CONSTRUCTION TYPAGE
//
export interface iconProps {
  icon: IconType;
}
//
export interface listIconProps {
  icon: IconType[];
  name: string[];
}
//
//
// SÉCURISER DONNÉES
//
//
export type linksType = "intern" | "extern";
//
//
// GLOBAL
//
//
export interface keys {
  key?: number;
}
//
export interface size {
  size?: | "s0"  | "s1"  | "s2"  | "s3"  | "s4"  | "s5"  | "s6"  | "s7"  | "s8"  | "s9"  | "s10";
}
//
export interface balise {
  balise?: "h1" | "h2" | "h3" | "h4" | "h5" | "div" | "p" | "li" | "span" | "label" | "figcaption";
}
//
export interface color {
  color?:| "cb"| "cw"| "c1"| "c2"| "c3"| "c4"| "c5"| "c6"| "c7"| "c8"| "c9"| "c10";
}
//
export interface fontSize {
fontSize?: "s0" | "s1" | "s2" | "s3" | "s4" | "s5" | "s6" | "s7" | "s8";
}
//
export interface transform {
  transform?: "maj" | "min" | "cap";
  }
//
export interface variant {
  variant?: "t0" | "t1" | "t2" | "t3" | "t4" | "t5" | "t6" | "t7" | "t8" | "t9" | "t10" | "icon";
  }
//
export interface sizeBloc {
  sizeBloc?: "s0" | "s1" | "s2" | "s3" | "s4" | "s5" | "s6" | "s7" | "s8" | "s9" | "s10";
}
//
export interface sizeImg {
  sizeImg?: "s0" | "s1" | "s2" | "s3" | "s4" | "s5" | "s6" | "s7" | "s8" | "s9" | "s10";
}
//
export interface sizeWeight {
  weight?: "w1" | "w2" | "w3" | "w4" | "w5" | "w6" | "w7" | "w8" | "w9";
}
//
export interface typeFamilly {
  familly?: "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "f9";
}
//
export interface mouseHover {
// eslint-disable-next-line @typescript-eslint/ban-types
handleMouse: Function;
data_mouse?: string;
}
//
//
// DATA
//
//
export interface linksProps {
  label?: string;
  title?: string;
  url?: string;
  type?: linksType;
  icon: iconProps;
  special?: string;
  infos?: string;
}
//
//
export interface persoProps {
  nav: route[];
  links: linksProps[];
}
//
//
export interface route {
  index?: number;
  label: string;
  url: string;
  url_id?: string;
  type: linksType;
  page?: React.ReactNode;
}
//
//
export interface List_Icon{
  [key: string]: {
    key?: number;
    type: string,
    icon: iconProps,
  }[];
}
//
//
export interface icon{
  icon: iconProps;
}
//
//
export interface aproposProps{
  title: string;
  span: string;
  icon: iconProps;
  p: React.ReactNode;
}
//
//
export interface calcule{
[key: string]: number;
}
//
//
export interface input extends Partial<variant & size & keys>{
  variable: string;
  type: string;
  icon: iconProps;
  text: string;
  value?: string | number;
  element?: string;
  unitee?:string;
  multiples?: boolean;
  className?: string;
  special?: string;

}
//
//
export interface regex{
  id: number;
  type: string;
  value: RegExp;
}
//
//
export interface modal_links {
  id: number;
  name: string;
  type: string;
  children: React.ReactNode;
}
//
//
export interface dropdown_data{
   [key: string]: string;
}
//
//
// BUILD
//
//
export interface button extends Partial<keys & size & fontSize & variant>{
  icon?: iconProps;
  disabled?: boolean;
  loading?: boolean;
  item_i?: boolean;
  className?: string;
  children?: React.ReactNode;
  children_actif?: React.ReactNode;
  active_child?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  fonction?: Function;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data_function?: any;
  href?: string;
  active_href?: string;
  type?: string;
  special?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useRef?: React.Ref<any>;
  input?: boolean;
  value_input?: string;
}
//
//
export interface typo extends Partial<keys & size & balise & color & transform & sizeWeight & typeFamilly & mouseHover>{
className?: string;
children?: React.ReactNode;
// eslint-disable-next-line @typescript-eslint/ban-types
fonction?: Function;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
data_function?: any;
href?: string;
active?: string;
type?: string;
special?: string;
copy?: string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
useRef?: React.Ref<any>;
datatext?: string;
icon?: iconProps;
LR?: string;
item_i?: boolean;
loading?: boolean;
}
//
//
export interface navlink {
  href: string;
  active?: string;
  type?: string;
  children: React.ReactNode;
  special?: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useRef?: React.Ref<any>;
  datatext?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  fonction?: Function;
}
//
//
export interface spinner extends Partial<size & variant>{
  icon?: iconProps;
  children?: React.ReactNode;
}
//
//
export interface img extends Partial<sizeBloc & sizeImg>{
  src?: string,
  alt?: string,
  className?: string;
  classImg?: string;
  radius?: string;
  classLink?: string;
  href?: string;
  active?: string;
  type?: string;
  special?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useRef?: React.Ref<any>
  datatext?: string;
 // eslint-disable-next-line @typescript-eslint/ban-types 
  fonction?: Function;
  
}
//
//
export interface input_type extends Partial<variant & size>{
  element?: string;
  type?: string;
  icon?: iconProps;
  text?: string;
  value?: string | number;
  unitee?: string;
  variable: string;
  multiples?: boolean;
  identifiant?: string;
// eslint-disable-next-line @typescript-eslint/ban-types 
  fonction?: Function;
// eslint-disable-next-line @typescript-eslint/ban-types
  search?: Function; 
  data?: string;
  special?: string;
}
//
//
export interface dropdown_type{
  key?: number;
  variant?: string;
  text?: string;
  icon?: iconProps;
  list?: dropdown_data[];
  value?: string | number;
  variable?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types 
  fonction?: Function;
  show?: boolean;
  search?: boolean;
  number?:boolean;
  filter?:boolean;
  modale?:boolean;
  placeholder?: string;
}
//
//
export interface modal {
  active: boolean;
  number: number;
  text?:string;
}
//
//
export interface tag{
  variant?: string;
  value?: string;
  type?: string;
  number?: boolean;
  quantite?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types 
  fonction?: Function;
  close?: Function;
  formData?: Function;
  tagComponent?: Function;
  img?: string;
}
//
//
export interface recipeBox{
  recipe: api_all_recipe;
}
//
export interface comment{
  comment: api_all_recipe;
  page: string;
}
//
export interface message{
  message: api_all_recipe;
}
//
//
export interface cardMenu  extends Partial<variant>{
  children: React.ReactNode;
  button: string;
}
//
//
// PAGE
//
//
export interface error {
  id?: string;
  errorText?: string;
  nolink?: boolean;
}
//
//
// API
//
//
export interface apiMedia{
  [key: string]: Blob| MediaSource;
}
//
//
export interface api {
  [key: string]: string;
}
//
//
export interface api_number {
  [key: string]: number;
}
//
//
export interface api_element_recipe{
  [key: string]: api[];
}
//
//
export interface api_all_recipe{
  [key: string]: api[] | string | number | api_element_recipe[] | string[];
}
//
//
// COMPONENT
//
//
export interface button_active{
  data: string,
  value: boolean,
  number?: number,
  section?: string,
}
//
//
export interface carousel{
  img: string[];
}
//
//
export interface navUser{
  data: string;
  token: token_valide;
  variable: React.ReactNode;
}
//
//
export interface conversation{
  conversation: api_all_recipe,
  token: token_valide;
}
//
//
export interface paginate{
data: number;
requette: Function;
showEntrie: number;
}
//
//
export interface ChangeArray{
  fieldName: string; 
  newValue: string;
  number: boolean;
  setFormDataArray: Dispatch<SetStateAction<{ [key: string]: api[] }>>;
  setTagsComponents?: Dispatch<SetStateAction< React.ReactNode[] >>;
  tagsComponents?: React.ReactNode[];
  variant?: string; 
  otherValue?: string;
  quantite?: string;
}
//
//
export interface ChangeArrayImg{
  fieldName: string; 
  newValue: Blob| MediaSource;
  number?: boolean;
  setFormDataArray: Dispatch<SetStateAction<{ [key: string]: apiMedia[] }>>;
  setTagsComponents?: Dispatch<SetStateAction< React.ReactNode[] >>;
  tagsComponents?: React.ReactNode[];
  variant?: string; 
  otherValue?: string;
  quantite?: string;
  multiples?: boolean;
}
//
//
export interface addTags{
  value?: string, 
  type: string, 
  number?: boolean,
  setTagsComponents: Dispatch<SetStateAction< React.ReactNode[] >>,
  tagsComponents: React.ReactNode[],
  setFormDataArray?: Dispatch<SetStateAction<{ [key: string]: api[] }>>,
  setFormDataMedia?: Dispatch<SetStateAction<{ [key: string]: apiMedia[] }>>,
  variant?: string,
  quantite?: string,
  img?: string, 
}
//
//
// REDUX
//
//
export interface object_button_reducer extends Partial<button_action>{

}
//
//
export interface button_reducer{
  buttonReducer: object_button_reducer[];
}
//
//
export interface modal_reducer{
  modalReducer: modal_action[];
}
//
export interface token_reducer{
  tokenReducer: token_valide;
}
//
export interface element_recipe_reducer{
  elementRecipeReducer: api_element_recipe;
}
//
export interface like_follow_reducer{
  LikeFollowReducer : api_element_recipe;
}
//
export interface cooking_process_reducer{
  cookingProcessReducer: api[];
}
//
export interface payload_api{
  userReducer: {
    [key: string]: string | number;
  };
  }
//
export interface consumption_reducer{
  consumptionReducer: {
    [key: string]: number;
  };
  } 
//
export interface comment_recipe_reducer{
  commentReducer : api_all_recipe[];
} 
//
export interface all_user_reducer{
  allUserReducer : api[];
}
//
export interface message_reducer{
  messageReducer : api_all_recipe[];
}
//
export interface conversation_reducer{
  conversationReducer : api_all_recipe[];
}      
//
//
// ACTION
//
//
export interface button_action{
  name?: string,
  value?: boolean,
  number?: number,
  section?: string,
  }
  //
  //
export interface modal_action{
    name?: string,
    active: boolean;
    number: number;
    text?: string;
    }
//
//

  //
  //
  export interface token_valide{
  token: boolean;
  id: string;
}  