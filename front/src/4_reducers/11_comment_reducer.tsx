// ACTION
import { GET_COMMENT, POST_LIKE_COMMENT, POST_COMMENT } from "#5_actions/11_comment_action";
// TYPAGE
import { api_all_recipe } from "#0_types/typages";
//
// VARIABLE
//
const initialState: api_all_recipe[] = [];
//
//
//
export default function commentReducer(state = initialState, action: {type: string; payload: { data: api_all_recipe[] }}){
    switch (action.type) {
        case GET_COMMENT:{
            const { data } = action.payload;
            return data;
        }
         case POST_LIKE_COMMENT: {
            // Action pour ajouter un like
            const { data } = action.payload;
        
            return state.map((comment: api_all_recipe) => {
                if (comment.id === data[1].id) {
                    const type = data[0].type.toString();
                        return {
                            ...comment,
                            [type]: (comment[type] as number) + (data[2].value as number)
                        };                    
                }
                return comment;
            });
        } 
        case POST_COMMENT: {
            const {data}  = action.payload;
            return [...state, data] ;
        }     
        default:
            return state; 
    }
}