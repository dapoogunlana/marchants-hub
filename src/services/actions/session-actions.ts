import { GETSESSIONDATA, LOGIN, LOGOUT } from "../constants/action-constants"
import { IloginData } from "../constants/interfaces/data-schemas"


export const login = (payload: IloginData) => {
    return {
        type: LOGIN,
        payload,
    }
}
export const getSessionData = (payload: String) => {
    return {
        type: GETSESSIONDATA,
        payload,
    }
}
export const logout = () => {
    return {
        type: LOGOUT,
        payload: {},
    }
}