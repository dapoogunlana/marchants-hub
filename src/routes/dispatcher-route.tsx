import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';
import Loader from '../components/block-components/loader/loader';
import { routeConstants } from '../services/constants/route-constants';

const UserModule = lazy(() => import("../layout/user/user-module"));
const DispatcherModule = lazy(() => import("../layout/user/user_types/dispatcher/dispatcher-module"));
const TabbedVendorOrders = lazy(() => import("../pages/vendor/vendor-orders/tabbed-vendor-orders"));
const VendorPaymentRecords = lazy(() => import("../pages/vendor/vendor-payment-records/vendor-payment-records"));

function DispatcherRoute() {
  return (
    <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path={routeConstants.all} element={<UserModule/>}>
          <Route path={routeConstants.all} element={<DispatcherModule/>}>
            <Route path={routeConstants.orders} element={<TabbedVendorOrders/>}></Route>
            <Route path={routeConstants.payments} element={<VendorPaymentRecords/>}></Route>
            <Route path={routeConstants.all} element={<Navigate to={routeConstants.orders}/>}></Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default DispatcherRoute;
