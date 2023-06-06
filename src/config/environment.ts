function sortBaseUrl() {
    const host = window.location.host;
    switch(host) {
        case 'localhost:3030':
            return 'https://secret-savannah-70891.herokuapp.com/api/v1/';
        case 'vendu.netlify.app':
            return 'https://secret-savannah-70891.herokuapp.com/api/v1/';
        default:
            return 'https://api.vendu.store/api/v1/';
    }
}
export const apiLinks = {
    url: sortBaseUrl(),
    cpUrl: 'https://manilla-backend.herokuapp.com/api/v2/',
}

export const apiKeys = {
    paystackPublicKey: "pk_test_c8feab96d4acff1d5453bbf63260c2fe2d9a2c13",
}