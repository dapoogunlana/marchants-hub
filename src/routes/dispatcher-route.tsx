import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';
import Loader from '../components/block-components/loader/loader';
import { routeConstants } from '../services/constants/route-constants';

const UserModule = lazy(() => import("../layout/user/user-module"));
const DispatcherModule = lazy(() => import("../layout/user/user_types/dispatcher/dispatcher-module"));
const ChildrenDashboard = lazy(() => import("../pages/admin/children-dashboard/children-dashboard"));
const ChildrenList = lazy(() => import("../pages/admin/children-list/children-list"));

function DispatcherRoute() {
  return (
    <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path={routeConstants.all} element={<UserModule/>}>
          <Route path={routeConstants.all} element={<DispatcherModule/>}>
            <Route path={routeConstants.childrenDashboard} element={<ChildrenDashboard/>}></Route>
            <Route path={routeConstants.childrenList} element={<ChildrenList/>}></Route>
            <Route path={routeConstants.all} element={<Navigate to={routeConstants.childrenDashboard}/>}></Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default DispatcherRoute;
