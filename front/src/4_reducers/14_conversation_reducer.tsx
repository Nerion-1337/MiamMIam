// ACTION
import { GET_CONVERSATION, OPTION_CONVERSATION, HIDDEN_CONVERSATION } from "#5_actions/14_conversation_action";
// DATA
import { Links_Server } from "#1_data/links";
// TYPAGE
import { api_all_recipe } from "#0_types/typages";
//
// VARIABLE
//
const initialState: api_all_recipe[] = [];
//
//
//
export default function conversationReducer(state = initialState, action: {type: string; payload: { data: api_all_recipe[] }}){
    switch (action.type) {
        case GET_CONVERSATION:{
            const { data } = action.payload;
            return data;
        }
        case OPTION_CONVERSATION: {
            // Action pour ajouter un like ou un follower à une recette
            const { data } = action.payload;
        
            return state.map((item: api_all_recipe) => {
                if (item.id === data[0].id) {
                    const type = Links_Server[8].option;
                        return {
                            ...item,
                            [type]: data[1].option_update
                        };                    
                }
                return item;
            })
        }
        case HIDDEN_CONVERSATION: {
            // Action pour ajouter un like ou un follower à une recette
            const { data } = action.payload;
        
            return state.map((item: api_all_recipe) => {
                if (item.id === data[0].id) {
                    const type = Links_Server[8].classification;
                        return {
                            ...item,
                            [type]: data[1].classification
                        };                    
                }
                return item;
            })
        }
        default:
            return state; 
    }
}