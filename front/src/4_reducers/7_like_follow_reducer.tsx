// TYPAGE
import { api_element_recipe } from "#0_types/typages";
// ACTION
import { GET_VERIFY_L_F } from "#5_actions/7_like_follow_action";
//
// VARIABLE
//
const initialState: api_element_recipe = {};
//
//
//
export default function LikeFollowReducer(state = initialState, action: {type: string; payload: api_element_recipe }){
    switch (action.type) {
        case GET_VERIFY_L_F: {
            const newState = { ...state };
            const { key, data } = action.payload;

            if (typeof key === 'string') {
                newState[key] = data;
            }

            return {
                ...newState,
            };
        }
        default:
            return state;
    }
}