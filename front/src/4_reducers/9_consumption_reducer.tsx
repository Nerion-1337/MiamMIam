// ACTION
import { GET_CONSUMPTION_USER, POST_CONSUMPTION_USER } from "#5_actions/9_consumption_action";
// TYPAGE
import { api_number } from "#0_types/typages";
//
// VARIABLE
//
const initialState: api_number = {};
//
//
//
export default function consumptionReducer(state = initialState, action: {type: string; payload: api_number}){
    switch (action.type) {
        case GET_CONSUMPTION_USER:
            return { ...action.payload };
        case POST_CONSUMPTION_USER: {
                const updatedPayload: Record<string, number> = { ...state };
                Object.keys(action.payload).forEach(key => {
                    const receivedValue = action.payload[key];
                    if (updatedPayload.hasOwnProperty(key)) {
                        updatedPayload[key] += receivedValue;
                    } else {
                        updatedPayload[key] = receivedValue;
                    }
                });
                return updatedPayload;
            }   
        default:
            return state; 
    }
}