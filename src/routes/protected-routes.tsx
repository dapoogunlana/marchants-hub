import { Outlet, Navigate } from 'react-router-dom';
import { routeConstants } from '../services/constants/route-constants';
// import { useSelector } from 'react-redux';
// import { Istate } from '../services/constants/interfaces/state-schemas';

const ProctedRoutes = () => {

    // const token = useSelector((state: Istate) => state.session?.token);
    const token = sessionStorage.getItem('token');

    return (
        token ? <Outlet/> : <Navigate to={`/${routeConstants.login}`} />
    );

}

export default ProctedRoutes;