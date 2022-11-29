import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';
import Loader from '../components/block-components/loader/loader';
import ChildrenDetail from '../pages/admin/children-detail/children-detail';
import FacilitatorDetail from '../pages/admin/facilitator-detail/facilitator-detail';
import { routeConstants } from '../services/constants/route-constants';

const UserModule = lazy(() => import("../layout/user/user-module"));
const AdminModule = lazy(() => import("../layout/user/user_types/admin/admin-module"));
const FacilitatorDashboard = lazy(() => import("../pages/admin/facilitator-dashboard/facilitator-dashboard"));
const FacilitatorList = lazy(() => import("../pages/admin/facilitator-list/tabbed-facilitator-list"));
const ChildrenDashboard = lazy(() => import("../pages/admin/children-dashboard/children-dashboard"));
const ChildrenList = lazy(() => import("../pages/admin/children-list/tabbed-children-list"));
const CohortDashboard = lazy(() => import("../pages/admin/cohort-dashboard/cohort-dashboard"));
const CohortList = lazy(() => import("../pages/admin/cohort-list/cohort-list"));
const Pillars = lazy(() => import("../pages/admin/pillars/pillars"));
const UserManagement = lazy(() => import("../pages/admin/user-management/user-management"));
const Admin = lazy(() => import("../pages/admin/admin/admin"));
const Profile = lazy(() => import("../pages/admin/profile/profile"));

function AdminRoute() {
  return (
    <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path={routeConstants.all} element={<UserModule/>}>
          <Route path={routeConstants.all} element={<AdminModule/>}>
            <Route path={routeConstants.facilitatorDashboard} element={<FacilitatorDashboard/>}></Route>
            <Route path={routeConstants.facilitatorList} element={<FacilitatorList/>}></Route>
            <Route path={`${routeConstants.facilitatorList}/:id`} element={<FacilitatorDetail/>}></Route>
            <Route path={routeConstants.childrenDashboard} element={<ChildrenDashboard/>}></Route>
            <Route path={routeConstants.childrenList} element={<ChildrenList/>}></Route>
            <Route path={`${routeConstants.childrenList}/:id`} element={<ChildrenDetail/>}></Route>
            <Route path={routeConstants.cohortDashboard} element={<CohortDashboard/>}></Route>
            <Route path={routeConstants.cohortList} element={<CohortList/>}></Route>
            <Route path={routeConstants.pillars} element={<Pillars/>}></Route>
            <Route path={routeConstants.userManagement} element={<UserManagement/>}></Route>
            <Route path={routeConstants.systemAdmin} element={<Admin/>}></Route>
            <Route path={routeConstants.profile} element={<Profile/>}></Route>
            <Route path={routeConstants.all} element={<Navigate to={routeConstants.facilitatorDashboard}/>}></Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AdminRoute;
