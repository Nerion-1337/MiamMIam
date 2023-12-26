import { IconType } from "react-icons";
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
export interface size {
  size?: | "s0"  | "s1"  | "s2"  | "s3"  | "s4"  | "s5"  | "s6"  | "s7"  | "s8"  | "s9"  | "s10";
}
//
export interface balise {
  balise?: "h1" | "h2" | "h3" | "h4" | "h5" | "div" | "p" | "li" | "span" | "label";
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
  transform?: "maj" | "min";
  }
//
export interface variant {
  variant?: "t0" | "t1" | "t2" | "t3" | "t4" | "t5" | "t6" | "t7" | "t8";
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
  type: linksType;
  page?: React.ReactNode;
}
//
//
export interface List_Icon{
  all: {
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
export interface input extends Partial<variant & size>{
  key?: number;
  variable: string;
  type: string;
  icon: iconProps;
  text: string;
  value?: string | number;
  element?: string;
  unitee?:string;
  multiples?: boolean;
  className?: string;
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
export interface button extends Partial<size & fontSize & variant>{
  icon?: iconProps;
  disabled?: boolean;
  loading?: boolean;
  item_i?: boolean;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useRef?: React.Ref<any>;
  input?: boolean;
  value_input?: string;
}
//
//
export interface typo extends Partial<size & balise & color & transform >{
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
  value?: string;
  type?: string;
  number?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types 
  fonction?: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types 
  close?: Function;
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
export interface api {
  [key: string]: string;
}
//
//
export interface api_element_recipe{
  [key: string]: api[];
}
//
//
// COMPONENT
//
//
export interface button_active{
  data: string,
  value: boolean,
}
//
//
// REDUX
//
//
export interface object_button_reducer{
name: string,
value: boolean,
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
//
export interface token_reducer{
  tokenReducer: token_valide;
}
//
export interface element_recipe_reducer{
  elementRecipeReducer: api_element_recipe;
}
//
//
// ACTION
//
//
export interface button_action{
  name?: string,
  value?: boolean,
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
export interface payload_api{
  userReducer: {
    [key: string]: string | number;
  };
  }
  //
  //
  export interface token_valide{
  [key: string]: boolean;
}  