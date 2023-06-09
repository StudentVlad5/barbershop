import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from 'redux/auth/operations';
import { selectIsRefreshing } from 'redux/auth/selectors'; //, getPermission
import { SharedLayout } from 'components/SharedLayout/SharedLayout';
import LandingPage from 'pages/LandingPage';
import AdminPage from 'pages/Admin/Admin';
import AdminUsersPage from 'pages/Admin/AdminUsers';
import AdminServicesPage from 'pages/Admin/AdminServices';

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  // const permission = useSelector(getPermission);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <></>
  ) : (
    <HelmetProvider>
      <Suspense fallback={<div>{'Loading...'}</div>}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<LandingPage />} />

            {/* {permission === 'admin' ? ( */}
            <Route path="admin" element={<AdminPage />} />
            {/* ) : (
               <Route path="user" element={<UserPage />} />
               )}*/}

            <Route path="admin/users" element={<AdminUsersPage />} />
            <Route path="admin/services" element={<AdminServicesPage />} />

            <Route path="*" element={<LandingPage />} />
          </Route>
        </Routes>
      </Suspense>
    </HelmetProvider>
  );
};
