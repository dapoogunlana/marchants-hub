import { GETSESSIONDATA, LOGIN, LOGOUT } from "../constants/action-constants"


export const sessionReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case LOGIN:
            return {...action.payload};
        case GETSESSIONDATA:

            return {...action.payload};
        case LOGOUT:
            return action.payload;
        default:
            return state;
    }
}