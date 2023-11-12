// BUILDER
import Button from "#components/build/global/button";
//COMPONENTS
import Button_active from "#components/active_redux/button_active";

//
//
//
//
//
export default function Accueil_ins_con(){
//
//
// FONCTION
//
//
function connexion_inscription(data:string){
  Button_active({data: data, value: true});
}
//
//
//    
    return(
        <>
        <section className="body_nav">
        <Button
         variant="t2"
         fontSize="s2"
         children="connexion"
         fonction={connexion_inscription}
         data_function={"connexion"}
        />
        <Button
         variant="t2"
         fontSize="s2"
         children="inscription"
         fonction={connexion_inscription}
         data_function={"inscription"}
        />
        </section>
        </>
    )  
}