// BUILDER
import Button from "#components/build/global/button";
//COMPONENTS
import Deconnexion from "#components/navigation/connexion/deconnexion";
import Accueil_ins_con from "#components/navigation/connexion/accueil_ins_con";
import Connexion from "#components/navigation/connexion/connexion";
import Inscription from "#components/navigation/connexion/inscription";
// DATA
import { Route_Client } from "#1_data/links";
// TYPAGE
import { navUser} from "#0_types/typages";

//
//
//
//
//


export default function Nav_user({
    data,
    token,
    variable
}: navUser){
//
//
// VARIABLE
//
//    
 
//
//
// BUILDER
//
//
const connexionContent = (
    <>
        {data === "connexion" ? (
          <Connexion />
        ) : data === "inscription" ? (
          <Inscription />
        ) : (
          <Accueil_ins_con />
        )}
    </>
  );
//
const accueil =(
    <>
    <Button
     variant="t2"
     fontSize="s2"
     children="accueil"
     href={Route_Client[0].url}
     type={Route_Client[0].type}
     active_href="active"
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
     active_href="active"
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
         href={`${Route_Client[6].url_id}${token.id}`}
         type={Route_Client[6].type}
         active_href="active"
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
         active_href="active"
        />
    </>
)
//
const bodyContent = (
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
const content = (
    <>
    <div className="content_aside">
  {variable}
  <div className="body_aside">
  {  data === "navigation" || token.token ? (
     bodyContent
  ):(
    connexionContent
  )}
  </div>
    </div>
    </>
)


//
// 
// RETURN
//
//   
    return content  
}