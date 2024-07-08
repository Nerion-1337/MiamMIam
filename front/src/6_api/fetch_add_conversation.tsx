//COMPONENTS
import Button_active from "#components/active_redux/button_active";
// DATA
import { Route_Server, Links_Server } from "#1_data/links";
// TYPAGE
import { api } from "#0_types/typages";
//
//
// REGISTER
//
//
export function new_conversation(formDataArray: {[key: string]: api[]}): Promise<boolean>{
   return fetch(`${Route_Server[0].url}${Route_Server[31].url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `${localStorage.getItem("token_miam_miam")}`,
        },
        body: JSON.stringify({
            formData: formDataArray.user,
        }),
      })
        .then((res) => res.json())
        .then((res) => {          
          if (res.conversation) {
            Button_active({data: "add_conversation", value: false});
            Button_active({data: "conversation_open",  value:true, number: res.conversation });
            return true
          } else {
            console.log(res)
            return false
          }
        })
        .catch((err) => {
          console.log(err);
          return false
        });
}