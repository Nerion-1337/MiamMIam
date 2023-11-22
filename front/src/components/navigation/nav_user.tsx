// DATA
import { Route_Client } from "#data/links";
// BUILDER
import Button from "#components/build/global/button";
//COMPONENTS
import Deconnexion from "#components/navigation/connexion/deconnexion";
//
//
//
//
//
export default function Nav_user(){
//
//
// BUILDER
//
//
const accueil =(
    <>
    <Button
     variant="t2"
     fontSize="s2"
     children="accueil"
     href={Route_Client[0].url}
     type={Route_Client[0].type}
     active="active"
    />
    </>
)
//
const dashbord =(
    <>
    <Button
     variant="t2"
     fontSize="s2"
     children="Dashboard"
     href={Route_Client[5].url}
     type={Route_Client[5].type}
     active="active"
    />
    </>
)
//
const profil =(
    <>
        <Button
         variant="t2"
         fontSize="s2"
         children="profil"
         href={Route_Client[6].url}
         type={Route_Client[6].type}
         active="active"
        />
    </>
)
//
const setting =(
    <>
        <Button
         variant="t2"
         fontSize="s2"
         children="Paramètre"
         href={Route_Client[4].url}
         type={Route_Client[4].type}
         active="active"
        />
    </>
)
//
const content = (
    <section className="body_main_nav">
  <div className="button_nav">
  {accueil}
  {dashbord}
  {profil}
  {setting}
  </div>
<Deconnexion/>
</section>
)
//
// 
// RETURN
//
//   
    return(
content
    )
}