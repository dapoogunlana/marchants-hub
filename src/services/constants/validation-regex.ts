

export const regexConstants = {
    bvnPattern: /^(2)([0-9]{10})$/,
    phonePattern: /^(0+(7|8|9)+(0|1)+\d{8})/,
    addressPattern: /^([a-zA-Z#,.\-\d\s])*$/,
    emailPattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    urlPattern: '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
        // url pattern not working for www ((http | https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)
}