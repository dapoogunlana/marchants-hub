import { Outlet, Navigate } from 'react-router-dom';
import { routeConstants } from '../services/constants/route-constants';

const ProctedRoutes = () => {

    const token = sessionStorage.getItem('token');

    return (
        token ? <Outlet/> : <Navigate to={`/${routeConstants.login}`} />
    );

}

export default ProctedRoutes;