import { SETACTIVEPRODUCT, REMOVEACTIVEPRODUCT } from "../constants/action-constants"


export const productReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case SETACTIVEPRODUCT:
            return action.payload;
        case REMOVEACTIVEPRODUCT:
            return {};
        default:
            return state;
    }
}


























