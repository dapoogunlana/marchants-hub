import { SETACTIVEPRODUCT, REMOVEACTIVEPRODUCT } from "../constants/action-constants"
import { IloginData } from "../constants/interfaces/data-schemas"


export const setActiveProduct = (payload: any) => {
    return {
        type: SETACTIVEPRODUCT,
        payload,
    }
}
export const removeActiveProduct = () => {
    return {
        type: REMOVEACTIVEPRODUCT,
    }
}