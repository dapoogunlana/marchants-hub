import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';
import Loader from '../components/block-components/loader/loader';
import { routeConstants } from '../services/constants/route-constants';

const UserModule = lazy(() => import("../layout/user/user-module"));
const VendorModule = lazy(() => import("../layout/user/user_types/vendor/vendor-module"));
const VendorDashboard = lazy(() => import("../pages/vendor/vendor-dashboard/vendor-dashboard"));
const TabbedVendorOrders = lazy(() => import("../pages/vendor/vendor-orders/tabbed-vendor-orders"));
const VendorProducts = lazy(() => import("../pages/vendor/vendor-products/vendor-products"));
const VendorOnlineStore = lazy(() => import("../pages/vendor/vendor-online-store/vendor-online-store"));
const VendorPaymentRecords = lazy(() => import("../pages/vendor/vendor-payment-records/vendor-payment-records"));

function VendorRoute() {
  return (
    <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path={routeConstants.all} element={<UserModule/>}>
          <Route path={routeConstants.all} element={<VendorModule/>}>
            <Route path={routeConstants.dashboard} element={<VendorDashboard/>}></Route>
            <Route path={routeConstants.orders} element={<TabbedVendorOrders/>}></Route>
            <Route path={routeConstants.products} element={<VendorProducts/>}></Route>
            <Route path={routeConstants.onlineStore} element={<VendorOnlineStore/>}></Route>
            <Route path={routeConstants.payments} element={<VendorPaymentRecords/>}></Route>
            <Route path={routeConstants.all} element={<Navigate to={routeConstants.dashboard}/>}></Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default VendorRoute;
