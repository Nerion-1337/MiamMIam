// TYPAGE
import { api_element_recipe, api } from "#0_types/typages";
// ACTION
import { GET_ELEMENT_RECIPE, PUT_ELEMENT_RECIPE } from "#5_actions/8_element_recipe_action";
//
// VARIABLE
//
const initialState: api_element_recipe = {};
//
//
//
export default function elementRecipeReducer(state = initialState, action: {type: string; payload: api_element_recipe}){
    switch (action.type) {
        case GET_ELEMENT_RECIPE: {
            const newState = { ...state };
            const { key, data } = action.payload;

            if (typeof key === 'string') {
                newState[key] = data;
            }

            return {
                ...newState,
            };
        }
        case PUT_ELEMENT_RECIPE: {
            const { key, data } = action.payload;

            if (typeof key === 'string') {
                const existingData = state[key] || [];

                let newData: api[] = [];

                if (Array.isArray(data)) {
                    newData = data.map((item: api) => ({ ...item }));
                } else if (typeof data === 'object') {
                    newData = [{ ...(data as api) }];
                }

                const mergedData = existingData.concat(newData);

                return {
                    ...state,
                    [key]: mergedData,
                };
            }
            return state;
        }
        default:
            return state;
    }
}