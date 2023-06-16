import { HelmetProvider } from 'react-helmet-async';
import { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
// import { RestrictedRoute } from 'routes/RestrictedRoute';
import { PrivateRoute } from 'routes/PrivateRoute';
import { refreshUser } from 'redux/auth/operations';
import { selectIsRefreshing, getPermission } from 'redux/auth/selectors';
import { SharedLayout } from 'components/SharedLayout/SharedLayout';
import LandingPage from 'pages/LandingPage';
import AdminPage from 'pages/Admin/Admin';
import AdminUsersPage from 'pages/Admin/AdminUsers';
import AdminServicesPage from 'pages/Admin/AdminServices';
import { User } from 'components/Sections/User/User';
import AdminOwnerPage from 'pages/Admin/AdminOwners';

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const permission = useSelector(getPermission);

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
            {permission === 'admin' ? (
              <Route
                path="admin"
                element={
                  <PrivateRoute redirectTo="/" component={<AdminPage />} />
                }
              />
            ) : (
              <Route
                path="user"
                element={<PrivateRoute redirectTo="/" component={<User />} />}
              />
            )}
            <Route
              path="admin/users"
              element={
                <PrivateRoute
                  redirectTo="/admin"
                  component={<AdminUsersPage />}
                />
              }
            />
            <Route
              path="admin/services"
              element={
                <PrivateRoute
                  redirectTo="/admin"
                  component={<AdminServicesPage />}
                />
              }
            />
            <Route
              path="admin/owners"
              element={
                <PrivateRoute
                  redirectTo="/admin"
                  component={<AdminOwnerPage />}
                />
              }
            />

            <Route path="*" element={<LandingPage />} />
          </Route>
        </Routes>
      </Suspense>
    </HelmetProvider>
  );
};
