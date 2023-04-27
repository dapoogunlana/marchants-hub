import { toast } from "react-toastify";
import { ADDCARTITEM, CHANGECARTITEMQUANTITY, CLEARCART, INITIATECART, REMOVECARTITEM } from "../constants/action-constants";
import { Icart, Iproduct } from "../constants/interfaces/product-and-orders-schema";


export const cartReducer = (state: Icart = {storeSlug: '', cartList: [] }, action: any) => {
    switch (action.type) {
        case INITIATECART:
            const presentSlug = state.storeSlug;
            if(presentSlug && presentSlug === action.payload) {
                return state;
            } else {
                return {storeSlug: action.payload, cartList: [] }
            }
        case ADDCARTITEM:
            const existing = state.cartList.find((item: Iproduct) => item._id === action.payload._id);
            if (existing) {
                toast.warning('This item is already in your cart');
                return state;
            }
            toast.success('Item has been added your cart');
            const newItem = {...action.payload, quantity: 1}
            return {
                storeSlug: state.storeSlug,
                cartList: [...state.cartList, newItem]
            };

        case REMOVECARTITEM:
            // const newState = [...state];
            // const item = newState.find(item => item._id === action.payload?._id);
            // newState.splice(newState.indexOf(item), 1);
            const newState = [...state.cartList];
            const filteredState = newState.filter((item: Iproduct) => item._id !== action.payload._id);
            return filteredState;
        case CHANGECARTITEMQUANTITY:
            const newState2 = [...state.cartList];
            const filteredState2 = newState2.map((item: Iproduct, index) => {
                let restructuredItem = Object.assign({...item});
                if(index === action.payload.index) {
                    action.payload.increase ? restructuredItem.quantity += 1 : restructuredItem.quantity -= 1;
                }
                return restructuredItem;
            });
            return {
                storeSlug: state.storeSlug,
                cartList: filteredState2
            };
        case CLEARCART:
            return {
                storeSlug: state.storeSlug,
                cartList: []
            };
        default:
            return state;
    }
}


























