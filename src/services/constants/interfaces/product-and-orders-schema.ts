import { string } from "yup/lib/locale"


export interface Iproduts {
    amount: number,
    availableQuantity: number,
    createdAt: string,
    description: string,
    images: {
        photoId: string,
        photoUrl: string,
        _id: string
    }[],
    name: string
    store: string,
    updatedAt : string,
    _id : string,
}
export const sampleProdut = {
    amount: 0,
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
    updatedAt : '',
    _id : '',
}