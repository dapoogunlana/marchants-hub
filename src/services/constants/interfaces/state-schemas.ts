

export interface Istate {
    session: any,
}

export interface IsessionData {
    address : string,
    bankAccount : string,
    bankCode : string,
    bankName : string,
    businessName : string,
    createdAt : string,
    email : string,
    isVerified : boolean,
    numOfDeliveries : number,
    ownerFirstName : string,
    ownerLastName : string,
    password? : string,
    phoneNumber : string,
    photoId : string,
    photoUrl : string,
    role : string,
    slug : string,
    state : string,
    updatedAt : string,
    verificationCode : any,
    verificationCodeExpires : any,
    __v : number,
    _id : string,
}