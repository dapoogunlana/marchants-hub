import { routeConstants } from "../constants/route-constants";


export const sortRoute = (user: string) => {
    const rc = routeConstants;
    const us = routeConstants.userLevels;
    switch(user) {
        case us.systemAdmin:
            return `/${rc.vendor}/`;
            // For changing
            // return `/${rc.systemAdmin}/`;
        case us.vendor:
            return `/${rc.vendor}/`;
        case us.dispatcher:
            return `/${rc.dispatcher}/`;
    }
}

export const goToSection = (section: string) => {
    setTimeout(() => {
        if(section && typeof(section) === 'string') {
            document.getElementById(section)?.scrollIntoView({behavior: 'smooth'});
        }
    }, 100);
}

export const logoutUser = () => {
    sessionStorage.clear();
    localStorage.clear();
    setTimeout(() => {
        window.location.href = `/${routeConstants.login}`;
    }, 200);
}