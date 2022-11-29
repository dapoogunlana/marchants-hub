
import React from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { routeConstants } from '../constants/route-constants';

function UserNavigationComponent() {

    const user = useSelector((state:any) => state.session?.user);
    console.log({user})

    const routeSorter = () => {
        switch(user.role) {
            case routeConstants.userLevels.systemAdmin:
                return <Navigate to={`/${routeConstants.vendor}/${routeConstants.dashboard}`}/>;
                // return <Navigate to={`/${routeConstants.systemAdmin}/${routeConstants.dashboard}`}/>;
            case routeConstants.userLevels.vendor:
                return <Navigate to={`/${routeConstants.vendor}/${routeConstants.dashboard}`}/>;
            case routeConstants.userLevels.dispatcher:
                return <Navigate to={`/${routeConstants.dispatcher}/${routeConstants.dashboard}`}/>;
        }
    }

    return (
        <>
            {routeSorter()}
        </>
    );
}

export default UserNavigationComponent;
