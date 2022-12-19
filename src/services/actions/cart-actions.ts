import { ADDCARTITEM, REMOVECARTITEM, CLEARCART } from "../constants/action-constants"
import { IloginData } from "../constants/interfaces/data-schemas"


export const addCartItem = (payload: IloginData) => {
    return {
        type: ADDCARTITEM,
        payload,
    }
}
export const removeCartItem = (payload: String) => {
    return {
        type: REMOVECARTITEM,
        payload,
    }
}
export const clearCart = () => {
    return {
        type: CLEARCART,
    }
}