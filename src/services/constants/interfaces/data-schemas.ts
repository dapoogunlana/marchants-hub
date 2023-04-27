import { Iproduct } from "./product-and-orders-schema";
import { IsessionData } from "./session-schemas";

export interface IloginData {
    token: number,
    firstname: string,
    lastname: string,
    userLevel: string,
}

export interface IroutObjectData {
    label?: string,
    routes: {
        name: string,
        link: string,
        icon?: string,
        image?: string,
        width?: number,
        standalone?: boolean,
    }[],
}


export interface IstoreState{
    session: IsessionData,
    activeProduct: Iproduct,
    cart: {
        storeSlug: string,
        cartList: Iproduct[]
    },
}