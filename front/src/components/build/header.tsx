// BUILDER
import Button from "#components/build/global/button";
import Typo from "#components/build/global/typography";
//COMPONENTS
import Button_active from "#components/active_redux/button_active";
// DATA
import { List_icon, Route_Client } from "#1_data/links";
// REACT
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
//REDUX
import { useSelector } from "react-redux";
// TYPAGE
import {  token_reducer } from "#0_types/typages";
//
//
//
//
//
export default function Header(){
//
//
// VARIABLE
//
//
const token = useSelector((state: token_reducer) => state.tokenReducer);
const location = useLocation();
//
const [currentURL, setCurrentURL] = useState(location.pathname);
//
const recipe = Route_Client[8].url_id ? Route_Client[8].url_id : ""
//
//
// ACTUALISATION VARIABLE
//
//
useEffect(() => {
    setCurrentURL(location.pathname);
  }, [location.pathname]);
//
//
// FUNCTION
//
//
function open_aside(data:string){
    Button_active({data: data, value: true});
}
//
//
// BUILDER
//
//
const header = (
    <>
    <header className="header">
    <Typo
    balise="h1"
    size="s7"
    transform="maj"
    className="logo"
    children="miam miam"
    weight="w1"
    familly="f2"
    color="c2"
    href={Route_Client[0].url}
    type={Route_Client[0].type}
    />
    <section className="button_header">
{/* - TCHAT - */}      
{token.token && <Button
variant="t1"
size="s3"
fontSize="s4"
icon={List_icon.all[1].icon}
fonction={open_aside}
data_function={"tchat_open"}
/>}
{/* - NAVIGATION - */}     
<Button
variant="t1"
size="s3"
fontSize="s5"
icon={List_icon.all[0].icon}
fonction={open_aside}
data_function={"navigation_open"}
/>
  </section>
</header>
    </>
)
//
const header_home = (
  <>
  <header className="header_home">
  <Typo
  balise="h1"
  size="s7"
  transform="maj"
  className="logo"
  children="miam miam"
  weight="w1"
  familly="f2"
  color="cw"
  href={Route_Client[0].url}
  type={Route_Client[0].type}
  />
  <section className="button_header">
{/* - TCHAT - */}      
{token.token && <Button
variant="t1"
size="s3"
fontSize="s4"
icon={List_icon.all[1].icon}
fonction={open_aside}
data_function={"tchat_open"}
/> }
{/* - NAVIGATION - */}     
<Button
variant="t1"
size="s3"
fontSize="s5"
icon={List_icon.all[0].icon}
fonction={open_aside}
data_function={"navigation_open"}
/>
</section>
</header>
<div className="baniere_header"></div>

  </>
)
//
const header_recipe = (
    <>
    <header className="header_recipe">
    <Typo
    balise="h1"
    size="s7"
    transform="maj"
    className="logo"
    children="miam miam"
    weight="w1"
    familly="f2"
    color="c2"
    href={Route_Client[0].url}
    type={Route_Client[0].type}
    />
    <section className="button_header">
  {/* - TCHAT - */}      
  {token.token && <Button
  variant="t1"
  size="s3"
  fontSize="s4"
  icon={List_icon.all[1].icon}
  fonction={open_aside}
  data_function={"tchat_open"}
  /> }
  {/* - NAVIGATION - */}     
  <Button
  variant="t1"
  size="s3"
  fontSize="s5"
  icon={List_icon.all[0].icon}
  fonction={open_aside}
  data_function={"navigation_open"}
  />
  </section>
  </header>
  <div className="baniere_recipe"></div>
  
    </>
  )
//
const content_header = (
    <>
    {currentURL == Route_Client[0].url && (header_home)}
    {currentURL.startsWith(recipe) && (header_recipe)}
    {!currentURL.startsWith(recipe) && currentURL != Route_Client[0].url &&  (header)}
    </>
)
//
//
// RETURN
//
//
    return(
        content_header
    )
}