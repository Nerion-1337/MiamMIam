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
export default function Auth(){
//
//
// FONCTION
//
//
function connexion(data:string){
    Button_active({data: "navigation_open", value: true});
    Button_active({data: data, value: true});
  }
//
// 
// RETURN
//
//      
    return(
        <>
        <main className="need_login">
  <article>
<Typo
balise="span"
size="s7" 
color="c2"
transform="maj"
weight="w1"
children="Veuillez vous connecter"
/>
<Typo
balise="span"
size="s5"
color="cb" 
weight="w5" 
children="Si vous êties déjà connecté, votre session expire après 72h"
/>
<Button
         variant="t2"
         fontSize="s2"
         children="connexion"
         fonction={connexion}
         data_function={"connexion"}
        />
  </article>
</main>
        </>
    )
}