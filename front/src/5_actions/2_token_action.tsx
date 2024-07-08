// DATA
import { Route_Server } from "#1_data/links"
// TYPAGE
import { token_valide } from "#0_types/typages";
//
//
//
export const GET_TOKEN = "GET_TOKEN";
//
export const token_actif = () => {
    return (dispatch: (action: { type: string; payload: token_valide; }) => void) => {
        return fetch(`${Route_Server[0].url}${Route_Server[11].url}`, {
            method: "GET",
            headers: {
              Authorization: `${localStorage.getItem("token_miam_miam")}`,
            },
          })
            .then((res) => res.json())
            .then((res) => {
                if(res.error_token){
                    dispatch({type: GET_TOKEN, payload: {
                      token: false,
                      id: ""
                    }})
                    localStorage.removeItem('token_miam_miam');
                    document.cookie = encodeURIComponent("token_miam_miam") + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";  
                  } else {
                    dispatch({type: GET_TOKEN, payload: { token: true, id: res.id }})
                  }
            })
            .catch((err) => console.log(err));
    }
};