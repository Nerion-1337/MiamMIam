// ACTION
import { GET_MESSAGE, POST_LIKE_MESSAGE, POST_MESSAGE } from "#5_actions/13_messages_action";
// TYPAGE
import { api_all_recipe } from "#0_types/typages";
//
// VARIABLE
//
const initialState: api_all_recipe[] = [];
//
//
//
export default function messageReducer(state = initialState, action: {type: string; payload: { data: api_all_recipe[] }}){
    switch (action.type) {
        case GET_MESSAGE:{
            const { data } = action.payload;
            return data;
        }
         case POST_LIKE_MESSAGE: {
            // Action pour ajouter un like
            const { data } = action.payload;
        
            return state.map((message: api_all_recipe) => {
                if (message.id === data[1].id) {
                    const type = data[0].type.toString();
                        return {
                            ...message,
                            [type]: (message[type] as number) + (data[2].value as number)
                        };                    
                }
                return message;
            });
        } 
        case POST_MESSAGE: {
            const {data}  = action.payload;
            return [...state, data] ;
        }     
        default:
            return state; 
    }
}