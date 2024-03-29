import { string } from "yup/lib/locale"


export interface Iproduct {
    amount: number;
    quantity: number;
    availableQuantity: number;
    createdAt: string;
    description: string;
    images: {
        photoId: string;
        photoUrl: string;
        _id: string;
    }[];
    name: string;
    store: string;
    storeSlug: string;
    totalSales: number;
    updatedAt: string;
    __v: number;
    _id: string;
}
export const sampleProdut = {
    amount: 0,
    quantity: 1,
    availableQuantity: 0,
    createdAt: '',
    description: '',
    images: [{
        photoId: '',
        photoUrl: '',
        _id: ''
    }],
    name: '',
    store: '',
    storeSlug: '',
    totalSales: 0,
    updatedAt : '',
    __v: 0,
    _id : '',
}

export interface Icart {
    storeSlug: string,
    cartList: Iproduct[]
}

export interface IorderSettings {
    deliveryFee: {
        min: number;
        max: number;
        percent: number;
    }
    merchantFee: {
        min: number;
        max: number;
        percent: number;
    }
    orderFee: {
        min: number;
        max: number;
        percent: number;
    }
}

export const sampleOrderSettings = {
    deliveryFee: {
        min: 0,
        max: 0,
        percent: 0,
    },
    merchantFee: {
        min: 0,
        max: 0,
        percent: 0,
    },
    orderFee: {
        min: 0,
        max: 0,
        percent: 0,
    }
}

export interface iDispatchActionData {
    id: string,
    type: string,
    message: any,
    title: any,
    showActionModal: boolean,
}