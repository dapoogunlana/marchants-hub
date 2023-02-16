
import React from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { routeConstants } from '../constants/route-constants';
import { IstoreState } from '../constants/interfaces/data-schemas';

function UserNavigationComponent() {

    const role = useSelector((state:IstoreState) => state.session.role);

    const routeSorter = () => {
        switch(role) {
            case routeConstants.userLevels.systemAdmin:
                return <Navigate to={`/${routeConstants.vendor}/${routeConstants.dashboard}`}/>;
                // return <Navigate to={`/${routeConstants.systemAdmin}/${routeConstants.dashboard}`}/>;
            case routeConstants.userLevels.vendor:
                return <Navigate to={`/${routeConstants.vendor}/${routeConstants.dashboard}`}/>;
            case routeConstants.userLevels.dispatcher:
                return <Navigate to={`/${routeConstants.dispatcher}/${routeConstants.orders}`}/>;
        }
    }

    return (
        <>
            {routeSorter()}
        </>
    );
}

export default UserNavigationComponent;
