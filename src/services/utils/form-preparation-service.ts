export const prepareDispatcherRegisterForm = (values: any, idCardFie: any) => {
    const formdata = new FormData();
    formdata.append('idCard', idCardFie);
    formdata.append('email', values.email);
    formdata.append('password', values.password);
    formdata.append('businessName', values.storeName);
    formdata.append('phoneNumber', values.phoneNumber);
    formdata.append('ownerFirstName', values.bizFirstName);
    formdata.append('ownerLastName', values.bizLastName);
    formdata.append('state', values.stateOfOperation);
    formdata.append('address', values.address);
    formdata.append('bankName', values.bankName.split('|')[1]);
    formdata.append('bankAccount', values.bankAccount);
    formdata.append('bankCode', values.bankName.split('|')[0]);
    formdata.append('confirmPassword', values.confirmPassword);
    formdata.append('role', 'Store');

    return formdata;
}

export const prepareNewProductForm = (values: any) => {
    const formdata = new FormData();
    formdata.append('images', values.file1 || values.file2 || values.file3);
    formdata.append('name', values.productName);
    formdata.append('description', values.description);
    formdata.append('amount', values.amount);
    formdata.append('availableQuantity', values.numberInStock);

    return formdata;
}