import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';
import Loader from '../components/block-components/loader/loader';
import { routeConstants } from '../services/constants/route-constants';

const HomeModule = lazy(() => import("../layout/home/home-module"));
const LandingPage = lazy(() => import("../pages/home/landing/landing"));
const LoginPage = lazy(() => import("../pages/home/login/login"));
const RegisterVendorPage = lazy(() => import("../pages/home/register-vendor/register-vendor"));
const RegisterDispatchPage = lazy(() => import("../pages/home/register-dispatcher/register-dispatcher"));
const ForgotPasswordPage = lazy(() => import("../pages/home/forgot-password/forgot-password"));
const ResetPasswordPage = lazy(() => import("../pages/home/reset-password/reset-password"));
const ConfirmEmailPage = lazy(() => import("../pages/home/confirm-email/confirm-email"));

function HomeRoute() {
  return (
    <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path={routeConstants.home} element={<HomeModule/>}>
            <Route path={routeConstants.home} element={<LandingPage/>}></Route>
            <Route path={routeConstants.login} element={<LoginPage/>}></Route>
            <Route path={routeConstants.registerVendor} element={<RegisterVendorPage/>}></Route>
            <Route path={routeConstants.registerDispatcher} element={<RegisterDispatchPage/>}></Route>
            <Route path={routeConstants.forgotPassword} element={<ForgotPasswordPage/>}></Route>
            <Route path={routeConstants.resetPassword} element={<ResetPasswordPage/>}></Route>
            <Route path={routeConstants.confirmEmail} element={<ConfirmEmailPage/>}></Route>
            <Route path={routeConstants.all} element={<Navigate to={routeConstants.home}/>}></Route>
          </Route>
      </Routes>
    </Suspense>
  );
}

export default HomeRoute;
