import { ADDCARTITEM, REMOVECARTITEM, CLEARCART, CHANGECARTITEMQUANTITY } from "../constants/action-constants"
import { Iproduct } from "../constants/interfaces/product-and-orders-schema"


export const addCartItem = (payload: Iproduct) => {
    return {
        type: ADDCARTITEM,
        payload,
    }
}
export const removeCartItem = (payload: Iproduct) => {
    return {
        type: REMOVECARTITEM,
        payload,
    }
}
export const changeCartItemQuantity = (index: number, increase: boolean) => {
    return {
        type: CHANGECARTITEMQUANTITY,
        payload: {index, increase},
    }
}
export const clearCart = () => {
    return {
        type: CLEARCART,
    }
}