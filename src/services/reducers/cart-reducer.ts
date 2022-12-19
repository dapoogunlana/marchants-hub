import { ADDCARTITEM, CLEARCART, REMOVECARTITEM } from "../constants/action-constants"


export const cartReducer = (state: any[] = [], action: any) => {
    switch (action.type) {
        case ADDCARTITEM:
            const existing = state.find(action.payload);
            if (existing) {
                return;
            }
            return [...state, action.payload];

        case REMOVECARTITEM:
            const newState = [...state];
            const item = newState.find(item => item._id === action.payload?._id);
            newState.splice(newState.indexOf(item), 1);
            return newState;
        case CLEARCART:
            return [];
        default:
            return state;
    }
}


























