import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';
import Loader from '../components/block-components/loader/loader';
import { routeConstants } from '../services/constants/route-constants';

const UserModule = lazy(() => import("../layout/user/user-module"));
const AdminModule = lazy(() => import("../layout/user/user_types/admin/admin-module"));

function AdminRoute() {
  return (
    <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path={routeConstants.all} element={<UserModule/>}>
          <Route path={routeConstants.all} element={<AdminModule/>}>
            {/* <Route path={routeConstants.facilitatorDashboard} element={<FacilitatorDashboard/>}></Route> */}
            <Route path={routeConstants.all} element={<Navigate to={routeConstants.dashboard}/>}></Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AdminRoute;
