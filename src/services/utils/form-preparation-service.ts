export const prepareVendorRegisterForm = (values: any) => {
    const formdata = new FormData();
    formdata.append('idCard', values.file);
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
export const prepareDispatcherRegisterForm = (values: any) => {
    const formdata = new FormData();
    formdata.append('idCard', values.file);
    formdata.append('email', values.email);
    formdata.append('password', values.password);
    formdata.append('businessName', values.companyName);
    formdata.append('phoneNumber', values.phoneNumber);
    formdata.append('ownerFirstName', values.bizFirstName);
    formdata.append('ownerLastName', values.bizLastName);
    formdata.append('state', values.stateOfOperation);
    formdata.append('address', values.lgaOfOperation);
    formdata.append('bankName', values.bankName.split('|')[1]);
    formdata.append('bankAccount', values.bankAccount);
    formdata.append('bankCode', values.bankName.split('|')[0]);
    formdata.append('confirmPassword', values.confirmPassword);
    formdata.append('role', 'Dispatcher');
    formdata.append('cacNo', values.cacNumber);
    formdata.append('city', values.lgaOfOperation);

    return formdata;
}

export const prepareNewProductForm = (values: any) => {
    const formdata = new FormData();
    const images = [];
    if (values.file1) {
        images.push(values.file1);
    }
    if (values.file2) {
        images.push(values.file2);
    }
    if (values.file3) {
        images.push(values.file3);
    }
    images.map((image) => formdata.append('images', image));
    formdata.append('name', values.name);
    formdata.append('description', values.description);
    formdata.append('amount', values.amount);
    formdata.append('availableQuantity', values.availableQuantity);

    return formdata;
}

export const prepareProfileInfoUpdateForm = (values: any, banks: any[]) => {
    const bankName = banks.find((bank) => bank.code === values.bankName)?.name;
    const formdata = new FormData();
    if(values.file){
        formdata.append('idCard', values.file);
    }
    formdata.append('bankCode', values.bankName);
    formdata.append('bankName', bankName);
    formdata.append('bankAccount', values.accountNumber);
    formdata.append('address', values.address);
    formdata.append('businessName', values.storeName);

    return formdata;
}