import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Loader from '../components/block-components/loader/loader';
import { routeConstants } from '../services/constants/route-constants';
import ProctedRoutes from './protected-routes';


const AdminRoutes = lazy(() => import("./admin-route"));
const VendorRoutes = lazy(() => import("./vendor-route"));
const DispatcherRoutes = lazy(() => import("./dispatcher-route"));
const HomeRoutes = lazy(() => import("./home-route"));

function BaseRoute() {
  return (
    <Router>
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route element={<ProctedRoutes/>}>
            <Route path={`${routeConstants.systemAdmin}/*`} element={<AdminRoutes/>}></Route>
            <Route path={`${routeConstants.vendor}/*`} element={<VendorRoutes/>}></Route>
            <Route path={`${routeConstants.dispatcher}/*`} element={<DispatcherRoutes/>}></Route>
          </Route>
          <Route path={'*'} element={<HomeRoutes/>}></Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default BaseRoute;
