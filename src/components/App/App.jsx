import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom'; //Navigate
import { Suspense } from 'react';
import { SharedLayout } from 'components/SharedLayout/SharedLayout';
import LandingPage from 'pages/LandingPage';

export const App = () => {
  // const dispatch = useDispatch();
  // const isRefreshing = useSelector(selectIsRefreshing);
  // const permission = useSelector(getPermission);
  // const { t } = useTranslation();

  // useEffect(() => {
  //   dispatch(refreshUser());
  // }, [dispatch]);

  return (
    <HelmetProvider>
      <Suspense fallback={<div>{'Loading...'}</div>}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<LandingPage />} />
            {/*
            <Route
              path="register"
              element={
                <RestrictedRoute
                  redirectTo="/user"
                  component={<RegisterPage />}
                />
              }
            />

            {permission === 'admin' ? (
              <Route
                path="login"
                element={
                  <RestrictedRoute
                    redirectTo="/admin"
                    component={<LoginPage />}
                  />
                }
              />
            ) : (
              <Route
                path="login"
                element={
                  <RestrictedRoute
                    redirectTo="/user"
                    component={<LoginPage />}
                  />
                }
              />
            )}
            <Route path="news" element={<NewsPage />} />

            <Route path="notices/:id" element={<NoticesPage />} />

            <Route
              path="notices/:favorite"
              element={
                <PrivateRoute
                  redirectTo="/register"
                  component={<NoticesPage />}
                />
              }
            />

            <Route
              path="notices/:own"
              element={
                <PrivateRoute
                  redirectTo="/register"
                  component={<NoticesPage />}
                />
              }
            />

            <Route path="friends" element={<OurFriendsPage />} />

            <Route
              path="user"
              element={
                <PrivateRoute redirectTo="/register" component={<UserPage />} />
              }
            />

            <Route
              path="admin"
              element={
                <PrivateRoute redirectTo="/user" component={<AdminPage />} />
              }
            />
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
              path="admin/notices"
              element={
                <PrivateRoute
                  redirectTo="/admin"
                  component={<AdminNoticesPage />}
                />
              }
            /> */}

            <Route path="*" element={<LandingPage />} />
          </Route>
        </Routes>
      </Suspense>
    </HelmetProvider>
  );
};
