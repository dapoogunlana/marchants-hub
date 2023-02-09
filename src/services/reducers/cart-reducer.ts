import { toast } from "react-toastify";
import { ADDCARTITEM, CHANGECARTITEMQUANTITY, CLEARCART, REMOVECARTITEM } from "../constants/action-constants";
import { Iproduct } from "../constants/interfaces/product-and-orders-schema";


export const cartReducer = (state: Iproduct[] = [], action: any) => {
    switch (action.type) {
        case ADDCARTITEM:
            const existing = state.find((item: Iproduct) => item._id === action.payload._id);
            if (existing) {
                toast.warning('This item is already in your cart');
                return state;
            }
            toast.success('Item has been added your cart');
            const newItem = {...action.payload, quantity: 1}
            return [...state, newItem];

        case REMOVECARTITEM:
            // const newState = [...state];
            // const item = newState.find(item => item._id === action.payload?._id);
            // newState.splice(newState.indexOf(item), 1);
            const newState = [...state];
            const filteredState = newState.filter((item: Iproduct) => item._id !== action.payload._id);
            return filteredState;
        case CHANGECARTITEMQUANTITY:
            const newState2 = [...state];
            const filteredState2 = newState2.map((item: Iproduct, index) => {
                let restructuredItem = Object.assign({...item});
                if(index === action.payload.index) {
                    action.payload.increase ? restructuredItem.quantity += 1 : restructuredItem.quantity -= 1;
                }
                return restructuredItem;
            });
            return filteredState2;
        case CLEARCART:
            return [];
        default:
            return state;
    }
}


























