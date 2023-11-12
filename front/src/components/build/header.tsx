// DATA
import { List_icon, Route_Client } from "#data/links";
// BUILDER
import Button from "#components/build/global/button";
import Typo from "#components/build/global/typography";
//COMPONENTS
import Button_active from "#components/active_redux/button_active";
//
//
//
//
//
export default function Header(){
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
// RETURN
//
//
    return(
<header>
    <Typo
    balise="h1"
    size="s7"
    transform="maj"
    className="logo"
    children="miam miam"
    href={Route_Client[0].url}
    type={Route_Client[0].type}
    />
    <section className="button_header">
{/* - TCHAT - */}      
<Button
variant="t1"
size="s3"
fontSize="s4"
icon={List_icon.all[1].icon}
fonction={open_aside}
data_function={"tchat_open"}
/>
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
    )
}