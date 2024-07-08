// TYPAGE
import { api_all_recipe } from "#0_types/typages";
// ACTION
import { GET_ALL_RECIPE, POST_LIKE_FOLLOW_RECIPE } from "#5_actions/6_all_recipe_action";
//
// VARIABLE
//
const initialState: api_all_recipe[] = [];
//
//
//
export default function allRecipeReducer(state = initialState, action: {type: string; payload: { data: api_all_recipe[] }}){
    switch (action.type) {
        case GET_ALL_RECIPE: {
            const { data } = action.payload;
            return data;
        }
        case POST_LIKE_FOLLOW_RECIPE: {
            // Action pour ajouter un like ou un follower à une recette
            const { data } = action.payload;
        
            return state.map((recipe: api_all_recipe) => {
                if (recipe.id === data[1].id) {
                    const type = data[0].type.toString();
                        return {
                            ...recipe,
                            [type]: (recipe[type] as number) + (data[2].value as number)
                        };                    
                }
                return recipe;
            });
        }
        default:
            return state;
    }
}