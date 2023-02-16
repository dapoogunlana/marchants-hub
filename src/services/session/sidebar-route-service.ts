import { IroutObjectData } from "../constants/interfaces/data-schemas";
import { routeConstants as rc } from "../constants/route-constants";
import { store } from "../store/store";

export const generateAdminRoutes = (): IroutObjectData[] => {

    const routes: IroutObjectData[] = [];

    return routes;
}

export const generateVendorRoutes = (): IroutObjectData[] => {

    const routes: IroutObjectData[] = [];

    const slug = store.getState().session?.user?.slug || '';

    routes.push({
        label: '',
        routes: [
            { name: 'Overview', link: rc.dashboard, icon: 'border-all' },
        ]
    });
    routes.push({
        label: 'Orders',
        routes: [
            { name: 'All orders', link: rc.orders, icon: 'table-list' },
        ]
    });
    routes.push({
        label: 'Products',
        routes: [
            { name: 'All products', link: rc.products, icon: 'book' },
        ]
    });
    routes.push({
        label: 'Sales channel',
        routes: [
            { name: 'Online store', standalone: true, link: `${rc.onlineStore}/${slug}`, icon: 'shop' },
        ]
    });
    routes.push({
        label: 'Payments',
        routes: [
            { name: 'Payment records', link: rc.payments, icon: 'building-columns' },
        ]
    });

    return routes;
}

export const generateDispatcherRoutes = (): IroutObjectData[] => {

    const routes: IroutObjectData[] = [];

    routes.push({
        label: 'Orders',
        routes: [
            { name: 'All orders', link: rc.orders, icon: 'table-list' },
        ]
    });
    routes.push({
        label: 'Payments',
        routes: [
            { name: 'Payment records', link: rc.payments, icon: 'building-columns' },
        ]
    });
    
    return routes;
}
